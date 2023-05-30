import Layout from '@/components/app/Layout'
import { api } from '@/utils/api'
import { Metric, Text, Title } from '@tremor/react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, type SubmitHandler, Controller } from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import { ApplicationError } from '@/lib/errors'

type GoalInputs = {
  date: Date,
  amount: string,
};


const Objectives = () => {
  const ctx = api.useContext()
  const { mutateAsync: addGoal } = api.goal['add-goal'].useMutation()
  const { data: allGoals, isLoading } = api.goal['get-all-goals'].useQuery()
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<GoalInputs>();
  const { mutateAsync: removeGoal } = api.goal['remove-goal'].useMutation()

  const onSubmit: SubmitHandler<GoalInputs> = async data => {
    await addGoal({ amount: Number(data.amount), dueDate: data.date })
    await ctx.goal['get-all-goals'].invalidate()
    reset()
  };

  const handleEliminate = async (id: string) => {
    await removeGoal({ id })
    await ctx.goal['get-all-goals'].invalidate()
  }
  console.log(errors)
  return (
    <Layout>
      <main className='max-w-5xl w-full mx-auto flex flex-col gap-8 pt-16 p-2'>
        <Title>
          Ponte objetivos financieros
        </Title>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
          {isLoading && !allGoals ? "Cargando..." :
            allGoals?.map((goal) => (
              <div className='max-w-sm w-full border border-dashed h-80 flex flex-col justify-between  p-8 text-2xl font-medium' key={goal.id}>
                <Title>
                  {goal.dueDate.toLocaleString("es-ES", { month: "long", day: "numeric" })}
                </Title>
                <Metric>
                  Objetivo:
                  ${goal.amount}
                </Metric>
                <Text></Text>
                <Button variant="destructive" onClick={() => { handleEliminate(goal.id).catch((err: string) => new ApplicationError(err)) }}>Eliminar</Button>
              </div>
            ))
          }
          <Dialog>
            <DialogTrigger asChild>
              <button className='max-w-sm w-full border border-dashed h-80 flex items-center justify-center text-2xl font-medium'>
                <span className='opacity-50'>Crear un objetivo</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={(e) => {
                handleSubmit(onSubmit)().catch(err => console.log(err))
                e.preventDefault()
              }} className="gap-4 py-4 flex flex-col">
                <Label htmlFor="date">
                  Fecha (Desde mañana)
                </Label>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={new Date()}
                  render={({ field }) => <Calendar
                    id="date"
                    mode="single"
                    onSelect={(e: Date | undefined) => {
                      const selectedDate = new Date(String(e));
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      if (selectedDate < today) {
                        field.onChange(today);
                      } else {
                        field.onChange(selectedDate);
                      }
                    }}
                    selected={field.value}
                    className="rounded-md border mx-auto"
                  />}
                />
                {errors.date && <span>Selecciona la fecha</span>}

                <Label htmlFor="amount">
                  Cantidad
                </Label>
                <Input id="amount" type="number" {...register("amount", { required: true, min: 1 })} />
                {errors.amount && <span>Pon un número mayor a 0</span>}
                <DialogFooter>
                  <Button type="submit" className="w-full">Agregar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </Layout>
  )
}

export default Objectives
