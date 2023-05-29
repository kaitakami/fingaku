import Head from 'next/head'
import { SearchDialog } from '@/components/app/ai/SearchDialog'

export default function AI() {
  return (
    <>
      <Head>
        <title>FingakuAI</title>
        <meta
          name="description"
          content="Haz preguntas a la inteligencia articial relacionadas con finanzas o Fingaku."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="">
          <SearchDialog />
        </div>
      </main>
    </>
  )
}
