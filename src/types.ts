import { z } from "zod"

export const pokemonVersionSchema = z.union([
  z.literal('red'),
  z.literal('crystal'),
  z.literal('emerald'),
]);
export type PokemonVersion = z.infer<typeof pokemonVersionSchema>

export type PokemonVersionDb = 'badgesRed' | 'badgesCrystal' | 'badgesEmerald'

export const Foo = z.union([z.literal(1), z.literal(2)])

export const aaa: z.infer<typeof Foo> = 1;

export const trainerUpdateSchema = z.object({
  badgeNumber: z.number(),
  id: z.string(),
  version: pokemonVersionSchema,
  remove: z.boolean().optional(),
})

export type TrainerUpdate = z.infer<typeof trainerUpdateSchema>
