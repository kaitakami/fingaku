/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SSE } from 'sse.js'
import type { CreateCompletionResponse } from 'openai'
import { Loader, User, Frown, CornerDownLeft, Search, Wand } from 'lucide-react'

function promptDataReducer(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any[],
  action: {
    index?: number
    answer?: string | undefined
    status?: string
    query?: string | undefined
    type?: 'remove-last-item' | string
  }
) {
  // set a standard state to use later
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const current = [...state]

  if (action.type) {
    switch (action.type) {
      case 'remove-last-item':
        current.pop()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return [...current]
      default:
        break
    }
  }

  // check that an index is present
  if (action.index === undefined) return [...state]

  if (!current[action.index]) {
    current[action.index] = { query: '', answer: '', status: '' }
  }

  current[action.index].answer = action.answer

  if (action.query) {
    current[action.index].query = action.query
  }
  if (action.status) {
    current[action.index].status = action.status
  }

  return [...current]
}

export function SearchDialog() {
  const [search, setSearch] = React.useState<string>('')
  const [question, setQuestion] = React.useState<string>('')
  const [answer, setAnswer] = React.useState<string | undefined>('')
  const eventSourceRef = React.useRef<SSE>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [promptIndex, setPromptIndex] = React.useState(0)
  const [promptData, dispatchPromptData] = React.useReducer(promptDataReducer, [])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
      }

      if (e.key === 'Escape') {
        handleModalToggle()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleModalToggle() {
    setSearch('')
    setQuestion('')
    setAnswer(undefined)
    setPromptIndex(0)
    dispatchPromptData({ type: 'remove-last-item' })
    setHasError(false)
    setIsLoading(false)
  }

  const handleConfirm = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/require-await
    async (query: string) => {
      setAnswer(undefined)
      setQuestion(query)
      setSearch('')
      dispatchPromptData({ index: promptIndex, answer: undefined, query })
      setHasError(false)
      setIsLoading(true)

      const eventSource = new SSE(`/api/vector-search`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
          Authorization: `Bearer ${String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)}`,
          'Content-Type': 'application/json',
        },
        payload: JSON.stringify({ query }),
      })

      function handleError<T>(err: T) {
        setIsLoading(false)
        setHasError(true)
        console.error(err)
      }

      eventSource.addEventListener('error', handleError)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      eventSource.addEventListener('message', (e: any) => {
        try {
          setIsLoading(false)

          if (e.data === '[DONE]') {
            setPromptIndex((x) => {
              return x + 1
            })
            return
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const completionResponse: CreateCompletionResponse = JSON.parse(e.data)
          const text = completionResponse.choices[0]?.text

          setAnswer((answer) => {
            const currentAnswer = answer ?? ''

            dispatchPromptData({
              index: promptIndex,
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              answer: currentAnswer + text,
            })

            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            return (answer ?? '') + text
          })
        } catch (err) {
          handleError(err)
        }
      })

      eventSource.stream()

      eventSourceRef.current = eventSource

      setIsLoading(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [promptIndex, promptData]
  )

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleConfirm(search)
  }

  return (
    <Dialog>
      <DialogTrigger className="text-base flex gap-2 items-center px-4 py-2 z-50 relative
        text-slate-500 dark:text-slate-400  hover:text-slate-700 dark:hover:text-slate-300
        transition-colors
        rounded-md
        border border-slate-200 dark:border-slate-500 hover:border-slate-300 dark:hover:border-slate-500
        min-w-[300px]">
        <Search width={15} />
        <span className="border border-l h-5"></span>
        <span className="inline-block ml-4">Buscar...</span>
      </DialogTrigger>
      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle>FingakuAI</DialogTitle>
          <DialogDescription>
            Pregunta sobre fingaku o finanzas.
          </DialogDescription>
          <hr />
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 text-slate-700">
            {question && (
              <div className="flex gap-4">
                <span className="bg-slate-100 dark:bg-slate-300 p-2 w-8 h-8 rounded-full text-center flex items-center justify-center">
                  <User width={18} />{' '}
                </span>
                <p className="mt-0.5 font-semibold text-slate-700 dark:text-slate-100">
                  {question}
                </p>
              </div>
            )}

            {isLoading && (
              <div className="animate-spin relative flex w-5 h-5 ml-2">
                <Loader />
              </div>
            )}

            {hasError && (
              <div className="flex items-center gap-4">
                <span className="bg-red-100 p-2 w-8 h-8 rounded-full text-center flex items-center justify-center">
                  <Frown width={18} />
                </span>
                <span className="text-slate-700 dark:text-slate-100">
                  Malas noticias, la busqueda fallo!
                </span>
              </div>
            )}

            {answer && !hasError ? (
              <div className="flex gap-4 dark:text-white flex-col">
                <div className='flex items-center gap-2'>
                  <span className="bg-green-500 p-2 w-8 h-8 rounded-full text-center flex items-center justify-center">
                    <Wand width={18} className="text-white" />
                  </span>
                  <h3 className="font-semibold">Respuesta:</h3>
                </div>
                <p className='overflow-y-auto'>{answer}</p>
              </div>
            ) : null}

            <div className="relative">
              <Input
                placeholder="Haz una pregunta..."
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="col-span-3"
              />
              <CornerDownLeft
                className={`absolute top-3 right-5 h-4 w-4 text-gray-300 transition-opacity ${search ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-100">
              O intenta:{' '}
              <button
                type="button"
                className="px-1.5 py-0.5
                  bg-slate-50 dark:bg-gray-500
                  hover:bg-slate-100 dark:hover:bg-gray-600
                  rounded border border-slate-200 dark:border-slate-600
                  transition-colors"
                onClick={() =>
                  setSearch('Qué es Fingaku?')
                }
              >
                Qué es Fingaku?
              </button>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-500">
              Preguntar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
