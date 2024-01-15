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
});
