import { ApplicationError } from "@/lib/errors";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const expenseRouter = createTRPCRouter({
  ["add-expense"]: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.date(),
        amount: z.number(),
        userId: z.string(),
        budgetId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.expense.create({
          data: {
            name: input.name,
            createdDate: input.date,
            amount: input.amount,
            userId: input.userId,
            budgetId: input.budgetId,
          },
        });
      } catch (error) {
        return new ApplicationError(
          "Tuvimos un error en nuestra base de datos, intenta de nuevo"
        );
      }
    }),
});
