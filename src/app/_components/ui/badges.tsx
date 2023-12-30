"use client";

import classNames from "classnames";

import { Badge } from "~/app/_components/badge";
import EditTrainername from "~/app/_components/ui/edit-trainername";
import { useTrainer } from "~/app/_hooks/trainer";
import { mapPokemonVersionToDb } from "~/trpc/map-pokemon-version-to-db";
import { type PokemonVersion } from "~/types";
import { type Trainer } from "@prisma/client";
import { api } from "~/trpc/react";

type BadgesProps = {
  red?: number[];
  crystal?: number[];
  emerald?: number[];
};

export function Badges(
  props: BadgesProps & {
    className?: string;
    trainer?: Trainer;
    editable?: boolean;
    init?: boolean;
    notrack?: boolean;
    title?: boolean;
  },
) {
  const { trainer, updateName } = useTrainer();
  let prepareVersionAndBadges: BadgesProps | [] = [];
  const shouldUseProps = props.red ?? props.emerald ?? props.crystal;

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
    updateName({ name });

    updateTrainerName.mutate({
      id: props.trainer?.id ?? "",
      name,
    });
  };

  return (
    <div
      className={classNames(
        "flex min-w-[280px] flex-col gap-4 rounded-xl bg-white/10 p-4 sm:min-w-[540px] ",
        props.className,
      )}
    >
      {props.trainer?.name ? (
        <EditTrainername
          editable={props.editable}
          trainername={props.trainer.name}
          onSuccess={editName}
        />
      ) : (
        props.title && <div className="h-[24px]">...</div>
      )}
      {versionAndBadges.map(([pokemonVersion, badges], i) =>
        badges?.length ? (
          <div
            className="grid grid-cols-4 justify-items-center gap-2 sm:grid-cols-8"
            key={i}
          >
            {badges.sort().map((badgeOrder, i) => {
              const version = pokemonVersion as PokemonVersion;

              const isBadgeActive = trainer[
                mapPokemonVersionToDb(pokemonVersion as PokemonVersion)
              ]?.includes(String(badgeOrder));

              return (
                <Badge
                  disable={Boolean(props.trainer?.name)}
                  key={i}
                  number={badgeOrder}
                  version={version}
                  {...(props.notrack
                    ? {
                        notrack: props.notrack,
                      }
                    : {
                        active: isBadgeActive,
                      })}
                  // active={isBadgeActive}
                />
              );
            })}
          </div>
        ) : null,
      )}
    </div>
  );
}
