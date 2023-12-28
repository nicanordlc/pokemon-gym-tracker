import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sessionRouter = createTRPCRouter({
  createWithTrainer: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const trainer = await ctx.db.trainer.create({ data: { name: input.name } })
      const session = await ctx.db.session.create({
        data: {
          trainers: { connect: trainer },
        },
      });

      return { session, trainer };
    }),

  getTrainers: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const session = await ctx.db.session.findFirst({
        where: {
          id: input.sessionId,
        },
        include: { trainers: true }
      });

      return session?.trainers;
    }),
});
