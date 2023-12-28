import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const trainerRouter = createTRPCRouter({
  createWithSession: publicProcedure
    .input(z.object({ name: z.string().min(3), sessionId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.trainer.create({
        data: {
          name: input.name,
          sessions: {
            connect: {
              path: input.sessionId,
            }
          },
        },
      });
    }),
});

