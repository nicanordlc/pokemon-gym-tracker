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

export const trainerUpdateBadgesSchema = z.object({
  badgeNumber: z.number(),
  id: z.string(),
  version: pokemonVersionSchema,
  remove: z.boolean().optional(),
})

export type TrainerUpdateBadges = z.infer<typeof trainerUpdateBadgesSchema>

type BadgeMetadata = {
  iconPathLeader: string;
  iconPathGym: string;
  leaderName: string;
  location: string;
  specialty: string;
  reward: string;
  unlocks: string;
  level: string;
};

export type PokemonVersionMetadata = Record<number, BadgeMetadata>;
