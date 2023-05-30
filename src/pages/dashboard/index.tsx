import { api } from "@/utils/api";
import { Card, Title, Text, Grid, Col, LineChart, Metric, Flex } from "@tremor/react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Layout from "@/components/app/Layout";
import { ApplicationError } from "@/lib/errors";
import { useState } from "react";
import { formatTotalMoney } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TransactionDialogForm from "@/components/app/ui/TransactionDialogForm";

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

const Dashboard = () => {
  const [days, setDays] = useState(10)
  const { data: lastMonthExpenses, isLoading } = api.expense["get-expenses-sum"].useQuery({})
  const { data: totalMoney, isLoading: isLoadingTotalMoney } = api.transaction["get-last-transaction"].useQuery()
  const { data: closestObjective, isLoading: isLoadingClosestObjective } = api.goal["get-closest-goal"].useQuery()
  const { data: rawMoneyGraphData } = api.transaction["get-transactions"].useQuery({ startDate: days })
  const formattedMoneyGraphData = formatTotalMoney(rawMoneyGraphData || [])
  return (
    <Layout>
      <main className="h-full flex w-full flex-col justify-center items-center max-w-7xl mx-auto p-2 pb-8">
        <div className="mr-auto pt-12">
          <Title>Dashboard</Title>
        </div>
        {totalMoney === null && <FirstTimeUserDashboard />}
        <div className="mr-auto pt-4">
          <Select defaultValue={String(days)} onValueChange={(e) => setDays(Number(e))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Días</SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Grid numColsLg={6} className="gap-6 mt-6 w-full">
          {/* Main section */}
          <Col numColSpanLg={4}>
            <Card className="h-full flex items-center p-1">
              {formattedMoneyGraphData ?
                <LineChart
                  className="p-0"
                  data={formattedMoneyGraphData}
                  index="date"
                  categories={["Dinero Total"]}
                  colors={["sky"]}
                  valueFormatter={dataFormatter}

                /> : "Cargando..."
              }
            </Card>
          </Col>
          {/* KPI sidebar */}
          <Col numColSpanLg={2}>
            <div className="space-y-6 h-full flex justify-between flex-col">
              <Card decoration="left" decorationColor="emerald" className="h-full">
                <Text>Dinero total</Text>
                <Metric>
                  {totalMoney && !isLoadingTotalMoney ?
                    dataFormatter(Math.round(Number(totalMoney.total ?? 0)))
                    : totalMoney === null
                      ? "$0" : "Cargando..."}
                </Metric>
              </Card>
              <Card decoration="left" decorationColor="red" className="h-full">
                <Text>Gastos en el último mes</Text>
                <Metric>
                  {lastMonthExpenses && !isLoading
                    ? dataFormatter(Math.round(Number(lastMonthExpenses[0]?._sum.amount ?? 0)))
                    : isLoading ? "Cargando..." : "$0"}
                </Metric>
              </Card>
              <Card decoration="left" decorationColor="blue" className="h-full">
                <Text>Objetivo más cercano</Text>
                <Text>{closestObjective?.dueDate.toLocaleString("es-ES", { month: "long" })}</Text>
                <Flex alignItems="start">
                  <Metric>{closestObjective && !isLoadingClosestObjective ? dataFormatter(Math.round(Number(closestObjective.amount ?? 0))) : isLoading ? "Cargando..." : "$0"}</Metric>
                  <Text>{(closestObjective?.amount ?? 0) - (totalMoney?.total ?? 0) > 0 ? `Falta $${(closestObjective?.amount ?? 0) - (totalMoney?.total ?? 0)}` : ""}</Text>
                </Flex>
              </Card>
            </div>
          </Col>
        </Grid>
        <Grid numColsMd={2} className="mt-6 gap-6 w-full">
          <TransactionDialogForm type="Gasto" />
          <TransactionDialogForm type="Ingreso" />
        </Grid>
      </main>
    </Layout >
  )
}

export default Dashboard

const FirstTimeUserDashboard = () => {
  const [total, setTotal] = useState<number>(15000)
  const { mutateAsync: mutateTransaction } = api.transaction["add-transaction"].useMutation()
  const ctx = api.useContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await mutateTransaction({ total })
    await ctx.transaction["get-last-transaction"].invalidate()
    await ctx.transaction["get-transactions"].invalidate()
  }
  return (
    <Card className="py-8 mt-5 space-y-3">
      <Title>
        Hola!
      </Title>
      <Text>
        Empieza registrando cuanto dinero tienes (puede ser un aproximado)
      </Text>
      <form onSubmit={(e) => { handleSubmit(e).catch((err: string) => new ApplicationError(err)) }} className="max-w-sm space-y-3">
        <Input name="total" type="number" required value={total} onChange={e => setTotal(Number(e.target.value))} />
        <Button className="w-full sm:w-auto">Agregar</Button>
      </form>
    </Card>
  )
}

