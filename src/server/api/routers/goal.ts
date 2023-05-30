import { ApplicationError } from "@/lib/errors";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const goalRouter = createTRPCRouter({
  ["add-goal"]: protectedProcedure
    .input(
      z.object({
        dueDate: z.date(),
        amount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.goal.create({
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
  ["remove-goal"]: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.goal.delete({
          where: {
            ...input,
          },
        });
      } catch (error) {
        return new ApplicationError(
          "Tuvimos un error en nuestra base de datos, intenta de nuevo"
        );
      }
    }),
  ["get-closest-goal"]: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.goal.findFirst({
      where: {
        userId: ctx.session.user.id,
        dueDate: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      orderBy: {
        createdDate: "asc",
      },
    });
  }),
  ["get-all-goals"]: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.goal.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdDate: "asc",
      },
    });
  }),
});
