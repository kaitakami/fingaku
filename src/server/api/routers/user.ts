import { ApplicationError } from "@/lib/errors";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  ["get-expenses-incomes"]: protectedProcedure
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
        return await ctx.prisma.user.findMany({
          where: {
            id: ctx.session.user.id,
          },
          select: {
            Expense: {
              where: {
                date: {
                  gte: startDate,
                  lte: today,
                },
              },
              select: {
                amount: true,
                id: true,
                name: true,
                createdDate: true,
                date: true,
                userId: true,
              },
            },
            Income: {
              where: {
                date: {
                  gte: startDate,
                  lte: today,
                },
              },
            },
          },
        });
      } catch (error) {
        return new ApplicationError(
          "Tuvimos un error en nuestra base de datos, intenta de nuevo"
        );
      }
    }),
});
