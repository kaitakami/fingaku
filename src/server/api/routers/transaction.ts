import { ApplicationError } from "@/lib/errors";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const transactionRouter = createTRPCRouter({
  ["add-transaction"]: protectedProcedure
    .input(
      z.object({
        total: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // check if there's already a transaction
        const transactionExists = await ctx.prisma.transaction.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
          orderBy: {
            createdDate: "asc",
          },
        });
        if (transactionExists) {
          await ctx.prisma.transaction.update({
            where: {
              id: transactionExists.id,
            },
            data: {
              createdDate: new Date(),
              ...input,
            },
          });
        } else {
          await ctx.prisma.transaction.create({
            data: {
              ...input,
              userId: ctx.session.user.id,
            },
          });
        }
      } catch {
        return new ApplicationError(
          "Tuvimos un error en nuestra base de datos, intenta de nuevo"
        );
      }
    }),
  ["get-transactions"]: protectedProcedure
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
        return await ctx.prisma.transaction.findMany({
          where: {
            userId: ctx.session.user.id,
            createdDate: {
              gte: startDate,
              lte: today,
            },
          },
          orderBy: {
            createdDate: "asc",
          },
        });
      } catch (error) {
        return new ApplicationError(
          "Tuvimos un error en nuestra base de datos, intenta de nuevo"
        );
      }
    }),
  ["get-last-transaction"]: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.transaction.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdDate: "desc",
      },
    });
  }),
  ["update-transactions"]: protectedProcedure
    .input(
      z.object({
        type: z.enum(["Gasto", "Ingreso"]),
        amount: z.number(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const date = new Date(input.date.setHours(0, 0, 0, 0));
      if (input.type === "Gasto") {
        await ctx.prisma.transaction.updateMany({
          where: {
            userId: ctx.session.user.id,
            createdDate: {
              gte: date,
            },
          },
          data: {
            total: {
              decrement: input.amount,
            },
          },
        });
        const dayTransaction = await ctx.prisma.transaction.findFirst({
          where: {
            userId: ctx.session.user.id,
            createdDate: {
              gte: date, // Check if a transaction exists for the specified day or after
              lt: new Date(date.getTime() + 86400000), // Check until the next day
            },
          },
        });

        if (dayTransaction === null) {
          const closestTransaction = await ctx.prisma.transaction.findFirst({
            where: {
              userId: ctx.session.user.id,
              createdDate: {
                gt: date, // Retrieve transactions that occurred on or before the specified day
              },
            },
            orderBy: {
              createdDate: "asc", // Retrieve the closest transaction by descending order
            },
          });

          if (closestTransaction) {
            await ctx.prisma.transaction.create({
              data: {
                userId: ctx.session.user.id,
                createdDate: date,
                total: closestTransaction?.total,
              },
            });
          }
        }
      } else if (input.type === "Ingreso") {
        await ctx.prisma.transaction.updateMany({
          where: {
            userId: ctx.session.user.id,
            createdDate: {
              gte: date,
            },
          },
          data: {
            total: {
              increment: input.amount,
            },
          },
        });
        const dayTransaction = await ctx.prisma.transaction.findFirst({
          where: {
            userId: ctx.session.user.id,
            createdDate: {
              gte: date, // Check if a transaction exists for the specified day or after
              lt: new Date(date.getTime() + 86400000), // Check until the next day
            },
          },
        });

        if (dayTransaction === null) {
          const closestTransaction = await ctx.prisma.transaction.findFirst({
            where: {
              userId: ctx.session.user.id,
              createdDate: {
                gt: date, // Retrieve transactions that occurred on or before the specified day
              },
            },
            orderBy: {
              createdDate: "asc", // Retrieve the closest transaction by descending order
            },
          });

          if (closestTransaction) {
            await ctx.prisma.transaction.create({
              data: {
                userId: ctx.session.user.id,
                createdDate: date,
                total: closestTransaction?.total - input.amount,
              },
            });
          }
        }
      }
    }),
});
