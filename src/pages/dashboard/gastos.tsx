import { useState } from "react";
import Layout from "@/components/app/Layout"
import { Card, Title, AreaChart, Flex, Grid, Text, Metric } from "@tremor/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { api } from "@/utils/api";
import { formatDataChart } from "@/lib/utils";

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const Expenses = () => {
  const [startDate, setStartDate] = useState(10)

  const { data: transactions } = api.userR["get-expenses-incomes"].useQuery({ startDate })

  const formattedTransactions = Array.isArray(transactions) ? formatDataChart(transactions) : { graph: [], income: 0, expenses: 0 }

  return (
    <Layout>
      <main className="max-w-6xl mx-auto pt-16 p-3 w-full">
        <Card>
          <Flex>
            <Title>Ingresos y Gastos</Title>
            <Select defaultValue={String(startDate)} onValueChange={(e) => setStartDate(Number(e))}>
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
          </Flex>
          <AreaChart
            className="mt-4"
            data={formattedTransactions.graph}
            index="date"
            categories={["Gastos", "Ingresos"]}
            colors={["red", "green"]}
            valueFormatter={dataFormatter}
          />
        </Card>
        <Grid numColsMd={2} className="mt-6 gap-6">
          <Card decoration="bottom" decorationColor="red" className="h-full flex flex-col justify-center space-y-5">
            <Text>Gastos en los últimos {startDate} días</Text>
            <Flex alignItems="start">
              <Metric>${formattedTransactions.expenses}</Metric>
            </Flex>
          </Card>
          <Card decoration="bottom" decorationColor="green" className="h-full flex flex-col justify-center space-y-5">
            <Text>Ingresos en los últimos {startDate} días</Text>
            <Flex alignItems="start">
              <Metric>${formattedTransactions.income}</Metric>
            </Flex>
          </Card>
        </Grid>
      </main>
    </Layout>
  )
}

export default Expenses
