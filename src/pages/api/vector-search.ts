/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// Access to this file through the Supabase docs https://github.com/supabase-community/nextjs-openai-doc-search/blob/main/pages/api/vector-search.ts

import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { codeBlock, oneLine } from "common-tags";
import GPT3Tokenizer from "gpt3-tokenizer";
import { type CreateCompletionRequest } from "openai";
import { ApplicationError, UserError } from "@/lib/errors";

// OpenAI API does currently not work in Vercel Edge Functions as it uses Axios under the hood.
export const config = {
  runtime: "edge",
};

const openAiKey = process.env.OPENAI_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req: NextRequest) {
  try {
    if (!openAiKey) {
      throw new ApplicationError("Missing environment variable OPENAI_KEY");
    }

    if (!supabaseUrl) {
      throw new ApplicationError("Missing environment variable SUPABASE_URL");
    }

    if (!supabaseServiceKey) {
      throw new ApplicationError(
        "Missing environment variable SUPABASE_SERVICE_ROLE_KEY"
      );
    }

    const requestData = await req.json();

    if (!requestData) {
      throw new UserError("Missing request data");
    }

    const { query } = requestData;

    if (!query) {
      throw new UserError("Missing query in request data");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    // Moderate the content to comply with OpenAI T&C
    const sanitizedQuery = query.trim();
    const moderationResponse = await fetch(
      "https://api.openai.com/v1/moderations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: sanitizedQuery,
        }),
      }
    ).then((res) => res.json());

    const [results] = moderationResponse.results;

    if (results.flagged) {
      throw new UserError("Flagged content", {
        flagged: true,
        categories: results.categories,
      });
    }

    const embeddingResponse = await fetch(
      "https://api.openai.com/v1/embeddings",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "text-embedding-ada-002",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          input: sanitizedQuery.replaceAll("\n", " "),
        }),
      }
    );

    if (embeddingResponse.status !== 200) {
      throw new ApplicationError(
        "Failed to create embedding for question",
        embeddingResponse
      );
    }

    const {
      data: [{ embedding }],
    } = await embeddingResponse.json();

    const { error: matchError, data: pageSections } = await supabaseClient.rpc(
      "match_page_sections",
      {
        embedding,
        match_threshold: 0.78,
        match_count: 10,
        min_content_length: 50,
      }
    );

    if (matchError) {
      throw new ApplicationError("Failed to match page sections", matchError);
    }

    const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
    let tokenCount = 0;
    let contextText = "";

    for (let i = 0; i < pageSections.length; i++) {
      const pageSection = pageSections[i];
      const content = pageSection.content;
      const encoded = tokenizer.encode(content);
      tokenCount += encoded.text.length;

      if (tokenCount >= 1500) {
        break;
      }

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      contextText += `${content.trim()}\n---\n`;
    }

    const prompt = codeBlock`
      ${oneLine`
      Eres un representante muy entusiasta de Fingaku a quien le encanta ayudar a las personas. Dada la siguiente sección de la documentación de Fingaku, así como tus conocimientos sobre finanzas, responde la pregunta utilizando únicamente esa información y mis capacidades, en formato markdown. Si no estoy seguro y la respuesta no está explícitamente escrita en la documentación o en tu conocimiento sobre finanzas, diras "Lo siento, no sé cómo ayudar con eso".

      `}

      Secciones de contexto:
      ${contextText}

      Pregunta: """
      ${sanitizedQuery}
      """

      Respuesta en formato markdown:
    `;

    const completionOptions: CreateCompletionRequest = {
      model: "text-davinci-003",
      prompt,
      max_tokens: 512,
      temperature: 0,
      stream: true,
    };

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completionOptions),
    });

    if (!response.ok) {
      const error = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new ApplicationError("Failed to generate completion", error);
    }

    // Proxy the streamed SSE response from OpenAI
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (err: unknown) {
    if (err instanceof UserError) {
      return new Response(
        JSON.stringify({
          error: err.message,
          data: err.data,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else if (err instanceof ApplicationError) {
      // Print out application errors with their additional data
      console.error(`${err.message}: ${JSON.stringify(err.data)}`);
    } else {
      // Print out unexpected errors as is to help with debugging
      console.error(err);
    }

    // TODO: include more response info in debug environments
    return new Response(
      JSON.stringify({
        error: "There was an error processing your request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
