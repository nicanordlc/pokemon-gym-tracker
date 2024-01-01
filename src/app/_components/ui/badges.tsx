"use client";

import classNames from "classnames";

import { Badge } from "~/app/_components/badge";
import EditTrainername from "~/app/_components/ui/edit-trainername";
import { useTrainer } from "~/app/_hooks/trainer";
import { mapPokemonVersionToDb } from "~/trpc/map-pokemon-version-to-db";
import { type PokemonVersion } from "~/types";
import { type Trainer } from "@prisma/client";
import { api } from "~/trpc/react";
import { useApp } from "~/app/_hooks/app";
import { getTrainer } from "~/utils/get-trainer";

type TrainerBadges = {
  red?: number[];
  crystal?: number[];
  emerald?: number[];
};

export type BadgesProps = TrainerBadges & {
  className?: string;
  classNameBadgesRow?: string;
  trainer?: Trainer;
  editable?: boolean;
  init?: boolean;
  notrack?: boolean;
  title?: boolean;
  badgesSize?: string;
};

export function Badges(props: BadgesProps) {
  const { trainers, updateName } = useTrainer();
  const { app } = useApp();

  let prepareVersionAndBadges: TrainerBadges | [] = [];
  const shouldUseProps = props.red ?? props.emerald ?? props.crystal;
  const trainer = getTrainer({
    trainers,
    sessionPath: app.sessionId,
  });

  const updateTrainerName = api.trainer.updateName.useMutation({});

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

  const editName = (name: string) => {
    updateName({ sessionPath: app.sessionId, name });

    updateTrainerName.mutate({
      id: props.trainer?.id ?? "",
      name,
    });
  };

  const badgesCount =
    (props.red?.length ?? 0) +
    (props.crystal?.length ?? 0) +
    (props.emerald?.length ?? 0);

  return (
    <div
      className={classNames(
        "flex flex-col gap-4 rounded-xl bg-white/10 p-4 ",
        props.className,
      )}
    >
      {props.trainer?.name ? (
        <div className="flex gap-2">
          <EditTrainername
            editable={props.editable}
            trainername={props.trainer.name}
            onSuccess={editName}
          />
          <p className="rounded-full border px-3">{badgesCount}</p>
        </div>
      ) : (
        props.title && <div className="h-[24px]">...</div>
      )}
      {versionAndBadges.map(([pokemonVersion, badges], i) =>
        badges?.length ? (
          <div
            className={classNames(
              "grid w-fit grid-cols-4 gap-2",
              props.classNameBadgesRow,
            )}
            key={i}
          >
            {badges.sort().map((badgeOrder, i) => {
              const version = pokemonVersion as PokemonVersion;

              const isBadgeActive = trainer[
                mapPokemonVersionToDb(pokemonVersion as PokemonVersion)
              ]?.includes(String(badgeOrder));

              const shouldTrack = props.notrack
                ? {
                    notrack: props.notrack,
                  }
                : {
                    active: isBadgeActive,
                  };

              return (
                <Badge
                  size={classNames("size-14", props.badgesSize)}
                  disable={Boolean(props.trainer?.name)}
                  key={i}
                  number={badgeOrder}
                  version={version}
                  {...shouldTrack}
                />
              );
            })}
          </div>
        ) : null,
      )}
    </div>
  );
}
