import { ApplicationError } from "@/lib/errors";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const incomeRouter = createTRPCRouter({
  ["add-income"]: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.date(),
        amount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.income.create({
          data: {
            ...input,
            userId: ctx.session.user.id,
          },
        });
      } catch (error) {
        return new ApplicationError(
          "Tuvimos un error en nuestra base de datos, intenta de nuevo"
        );
      }
    }),
});
