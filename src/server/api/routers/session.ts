import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sessionRouter = createTRPCRouter({
  createWithTrainer: publicProcedure
    .input(z.object({
      name: z.string(),
      isLeader: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.db.session.create({
        data: {},
      });
      const trainer = await ctx.db.trainer.create({
        data: {
          name: input.name,
          ...(input.isLeader && {sessionLeader: true}),
          session: {
            connect: session,
          },
        },
      });

      return { session, trainer };
    }),

  get: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const session = await ctx.db.session.findUnique({
        where: { path: input.sessionId },
      });

      if (!session) {
        throw new Error("Session not found");
      }

      return session;
    }),

  updateTimer: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      timerState: z.enum(["PLAYING", "STOPPED"]),
      timerStartTime: z.date().nullable(),
      timerDuration: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.db.session.update({
        where: { path: input.sessionId },
        data: {
          timerState: input.timerState,
          timerStartTime: input.timerStartTime,
          timerDuration: input.timerDuration,
        },
      });

      return session;
    }),
});
