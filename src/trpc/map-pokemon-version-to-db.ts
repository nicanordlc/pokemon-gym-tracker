import { type PokemonVersionDb, type PokemonVersion } from "~/types";

export function mapPokemonVersionToDb(version: PokemonVersion) {
  const mapper: Record<PokemonVersion, PokemonVersionDb> = {
    red: 'badgesRed',
    crystal: 'badgesCrystal',
    emerald: 'badgesEmerald',
  };

  return mapper[version];
}
