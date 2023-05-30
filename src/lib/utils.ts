import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RouterOutputs } from "../utils/api";

type UserExpensesIncomes = RouterOutputs["userR"]["get-expenses-incomes"];
type totalMoneyLastDays = RouterOutputs["transaction"]["get-transactions"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface Transaction {
  id: string;
  date: Date;
  createdDate: Date;
  name: string;
  amount: number;
  userId: string;
}

interface FormattedTransaction {
  date: string;
  Ingresos: number;
  Gastos: number;
}

function formatDate(dateString: Date): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "numeric" });
}

export function formatDataChart(transactions: UserExpensesIncomes): {
  graph: FormattedTransaction[];
  income: number;
  expenses: number;
} {
  if (
    Array.isArray(transactions) &&
    transactions[0]?.Expense &&
    transactions[0]?.Income
  ) {
    const formattedTransactions: Transaction[] = [
      ...transactions[0].Expense,
      ...transactions[0].Income,
    ];

    formattedTransactions.sort((a, b) => a.date.getTime() - b.date.getTime());

    const formattedData: FormattedTransaction[] = [];
    let totalIncome = 0;
    let totalExpenses = 0;

    for (const formattedTransaction of formattedTransactions) {
      const formattedDate = formatDate(formattedTransaction.date);

      let existingTransaction = formattedData.find(
        (data) => data.date === formattedDate
      );

      if (!existingTransaction) {
        existingTransaction = {
          date: formattedDate,
          Ingresos: 0,
          Gastos: 0,
        };
        formattedData.push(existingTransaction);
      }

      if (transactions[0].Expense.includes(formattedTransaction)) {
        existingTransaction.Gastos += formattedTransaction.amount;
        totalExpenses += formattedTransaction.amount;
      } else if (transactions[0].Income.includes(formattedTransaction)) {
        existingTransaction.Ingresos += formattedTransaction.amount;
        totalIncome += formattedTransaction.amount;
      }
    }

    return {
      graph: formattedData,
      income: totalIncome,
      expenses: totalExpenses,
    };
  } else {
    return {
      graph: [],
      income: 0,
      expenses: 0,
    };
  }
}

export const formatTotalMoney = (transactions: totalMoneyLastDays) => {
  if (Array.isArray(transactions)) {
    return transactions.map((transaction) => ({
      date: formatDate(transaction.createdDate),
      ["Dinero Total"]: transaction.total,
    }));
  }
};
