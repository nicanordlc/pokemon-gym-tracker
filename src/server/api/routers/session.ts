import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sessionRouter = createTRPCRouter({
  createWithTrainer: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.db.session.create({
        data: {},
      });
      const trainer = await ctx.db.trainer.create({
        data: {
          name: input.name,
          session: {
            connect: session,
          },
        },
      });

      return { session, trainer };
    }),
});
