"use client";

import classNames from "classnames";

import { Badge } from "~/app/_components/badge";
import EditTrainername from "~/app/_components/ui/edit-trainername";
import { type PokemonVersion } from "~/types";

type BadgesProps = {
  red?: number[];
  crystal?: number[];
  emerald?: number[];
};

export function Badges(
  props: BadgesProps & {
    className?: string;
    trainername?: string;
    init?: boolean;
    title?: boolean;
    redActive?: number[];
    crystalActive?: number[];
    emeraldActive?: number[];
  },
) {
  let prepareVersionAndBadges: BadgesProps | [] = [];
  const shouldUseProps = props.red ?? props.emerald ?? props.crystal;

  if (shouldUseProps) {
    prepareVersionAndBadges = {
      red: props.red,
      crystal: props.crystal,
      emerald: props.emerald,
    };
  } else {
    if (props.init) {
      const allGyms = [1, 2, 3, 4, 5, 6, 7, 8];
      const defaultBadges = {
        red: allGyms,
        crystal: allGyms,
        emerald: allGyms,
      };

      prepareVersionAndBadges = defaultBadges;
    }
  }

  const versionAndBadges = Object.entries(prepareVersionAndBadges);

  return (
    <div
      className={classNames(
        "flex min-w-[280px] flex-col gap-4 rounded-xl bg-white/10 p-4 sm:min-w-[540px] ",
        props.className,
      )}
    >
      {props.trainername ? (
        <EditTrainername edit trainername={props.trainername} />
      ) : (
        props.title && <div className="h-[24px]">...</div>
      )}
      {versionAndBadges.map(([pokemonVersion, badges], i) => {
        const version = pokemonVersion as PokemonVersion;

        return badges?.length ? (
          <div
            className="grid grid-cols-4 justify-items-center gap-2 sm:grid-cols-8"
            key={i}
          >
            {badges.sort().map((badgeOrder, i) => (
              <Badge
                disable={Boolean(props.trainername)}
                key={i}
                number={badgeOrder}
                version={version}
              />
            ))}
          </div>
        ) : null;
      })}
    </div>
  );
}
