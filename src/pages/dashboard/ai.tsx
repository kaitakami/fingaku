import Layout from '@/components/app/Layout'
import { SearchDialog } from '@/components/app/ai/SearchDialog'


export default function AI() {
  return (
    <Layout>
      <main className='max-w-5xl w-full mx-auto flex flex-col gap-8 pt-16 text-center p-3'>
        <h1 className='text-5xl font-bold'>FingakuAI</h1>
        <div>
          <p>
            Has preguntas relacionadas con Fingaku o Finanzas y nuestra inteligencia artificial intentará responderte!
          </p>
          <span className='opacity-70 text-sm'>Versión Beta, verifica la información antes de proceder, nada es consejo financiero.</span>
        </div>
        <SearchDialog />
      </main>
    </Layout>
  )
}
