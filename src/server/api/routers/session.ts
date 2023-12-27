import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sessionRouter = createTRPCRouter({
  createWithUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const trainer = await ctx.db.trainer.create({ data: { name: input.name } })
      const session = await ctx.db.session.create({
        data: {
          trainers: {
            connect: trainer,
          },
        },
      });

      return { session, trainer };
    }),
});
