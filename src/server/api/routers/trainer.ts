import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { mapPokemonVersionToDb } from "~/trpc/map-pokemon-version-to-db";
import { trainerUpdateSchema } from "~/types";
import { updateTrainerBadge } from "~/utils/update-trainer-badge";

export const trainerRouter = createTRPCRouter({
  first: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.trainer.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string().min(3),
      sessionId: z.string(),
    }))
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

  update: publicProcedure
    .input(trainerUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const trainerBadgesVersion = mapPokemonVersionToDb(input.version);
      const trainer = await ctx.db.trainer.findFirst({
        where: {
          id: input.id,
        }
      });
      return ctx.db.trainer.update({
        where: {
          id: input.id,
        },
        data: {
          [trainerBadgesVersion]: updateTrainerBadge({
            badgeNumber: input.badgeNumber,
            remove: input.remove,
            badges: trainer?.[trainerBadgesVersion] ?? '',
          }),
        },
      });
    }),
});

