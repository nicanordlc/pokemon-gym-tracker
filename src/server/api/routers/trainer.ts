import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { mapPokemonVersionToDb } from "~/utils/map-pokemon-version-to-db";
import { trainerUpdateBadgesSchema } from "~/types";
import { updateTrainerBadge } from "~/utils/update-trainer-badge";

export const trainerRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      name: z.string().min(3),
      sessionPath: z.string(),
      isLeader: z.boolean().optional().nullable(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.trainer.create({
        data: {
          name: input.name,
          ...(input.isLeader && {sessionLeader: input.isLeader}),
          session: {
            connect: {
              path: input.sessionPath,
            }
          },
        },
      });
    }),

  updateBadges: publicProcedure
    .input(trainerUpdateBadgesSchema)
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

  updateName: publicProcedure
    .input(z.object({ name: z.string(), id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.trainer.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
        },
      });
    }),

  getTrainers: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.trainer.findMany({
        where: {
          session: {
            path: input.sessionId,
          }
        },
      });
    }),

    delete: publicProcedure.input(z.object({id: z.string()})).mutation(({ctx, input}) => {
      return ctx.db.trainer.delete({
        where: {
          id: input.id,
        },
      })
    }),
});

