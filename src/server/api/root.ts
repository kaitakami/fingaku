import { createTRPCRouter } from "@/server/api/trpc";
import { expenseRouter } from "./routers/expense";
import { incomeRouter } from "./routers/income";
import { userRouter } from "./routers/user";
import { transactionRouter } from "./routers/transaction";
import { goalRouter } from "./routers/goal";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  userR: userRouter,
  expense: expenseRouter,
  income: incomeRouter,
  transaction: transactionRouter,
  goal: goalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
