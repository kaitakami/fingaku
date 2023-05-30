import { api } from "@/utils/api";
import { ApplicationError } from "@/lib/errors";
import { Title } from "@tremor/react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Type = "Gasto" | "Ingreso"

type ExpenseIncomeInputs = {
  name: string,
  date: Date,
  amount: string,
};


const TransactionDialogForm = (
  { type }: { type: Type }) => {
  const ctx = api.useContext()
  const { mutateAsync: mutateExpense } = api.expense["add-expense"].useMutation()
  const { mutateAsync: mutateIncome } = api.income["add-income"].useMutation()
  const { mutateAsync: transactionUpdate } = api.transaction["update-transactions"].useMutation()
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<ExpenseIncomeInputs>();

  const handleMutation = async ({ type, data }: { type: Type, data: ExpenseIncomeInputs }) => {
    try {
      if (type === "Ingreso") {
        await mutateIncome({ ...data, amount: Number(data.amount) })
      } else if (type === "Gasto") {
        await mutateExpense({ ...data, amount: Number(data.amount) })
      }
    }
    finally {
      await transactionUpdate({ type, date: data.date, amount: Number(data.amount) })
      await ctx.expense["get-expenses-sum"].invalidate()
      await ctx.transaction["get-last-transaction"].invalidate()
      await ctx.transaction["get-transactions"].invalidate()
    }
  }
  const onSubmit: SubmitHandler<ExpenseIncomeInputs> = data => {
    handleMutation({ type, data })
      .catch((err: string) => new ApplicationError(err))
    reset()
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full h-full border-dashed rounded-lg border">
          <div className="h-28 flex items-center justify-center hover:opacity-70 transition-opacity">
            <Title>Agregar {type}</Title>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar {type}</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => {
          handleSubmit(onSubmit)().catch(err => console.log(err))
          e.preventDefault()
        }} className="gap-4 py-4 flex flex-col">
          <Label htmlFor="name">
            Nombre
          </Label>
          <Input id="name" {...register("name", { required: true })} />
          {errors.name && <span>Puedes poner un nombre como luz o gas</span>}
          <Label htmlFor="date">
            Fecha (No se aceptan fechas futuras)
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
                const selectedDate = new Date(String(e)); // Convert the selected date to a Date object
                const today = new Date(); // Get today's date

                today.setHours(0, 0, 0, 0); // Set the time portion of today's date to midnight

                if (selectedDate > today) {
                  // If the selected date is after today, set the field value to today
                  field.onChange(today);
                } else {
                  field.onChange(selectedDate); // Otherwise, set the field value to the selected date
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
  )
}

export default TransactionDialogForm
