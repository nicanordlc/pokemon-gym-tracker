import { sessionRouter } from "~/server/api/routers/session";
import { trainerRouter } from "~/server/api/routers/trainer";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  session: sessionRouter,
  trainer: trainerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
