import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const trainerRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.trainer.create({
        data: {
          name: input.name,
        },
      });
    }),
});
