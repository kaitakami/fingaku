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
        budgetId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.expense.create({
          data: {
            ...input,
            userId: ctx.session.user.id,
          },
        });
      } catch (error) {
        return new ApplicationError(
          "Tuvimos un error en nuestra base de datos, intenta de nuevo"
        );
      }
    }),
  ["get-expenses"]: protectedProcedure
    .input(
      z.object({
        startDate: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(today.getDate() - (input.startDate || 10));
      try {
        await ctx.prisma.expense.findMany({
          where: {
            userId: ctx.session.user.id,
            createdDate: {
              gte: startDate,
              lte: today,
            },
          },
        });
      } catch (error) {
        return new ApplicationError(
          "Tuvimos un error en nuestra base de datos, intenta de nuevo"
        );
      }
    }),
  ["get-expenses-sum"]: protectedProcedure
    .input(
      z.object({ endDate: z.date().optional(), startDate: z.date().optional() })
    )
    .query(async ({ ctx, input }) => {
      const fromDay = input.startDate || new Date();
      const toDay = input.endDate || new Date();
      fromDay.setDate(toDay.getDate() - 30);

      return await ctx.prisma.expense.groupBy({
        by: ["userId"],
        where: {
          userId: ctx.session.user.id,
          createdDate: {
            gte: fromDay,
            lte: toDay,
          },
        },
        _sum: {
          amount: true,
        },
      });
    }),
});
