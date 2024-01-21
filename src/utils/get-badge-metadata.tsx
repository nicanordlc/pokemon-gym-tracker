import { type Badge } from "~/app/_components/badge";
import { type PokemonVersionMetadata, type PokemonVersion } from "~/types";
import { crystal, emerald, red } from "~/utils/badge-metadata";

export function getBadgeMetadata(props: Badge) {
  const badgeInfo: Record<PokemonVersion, PokemonVersionMetadata> = {
    red,
    crystal,
    emerald,
  };

  return badgeInfo[props.version][props.number];
}
