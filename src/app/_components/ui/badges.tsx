"use client";

import classNames from "classnames";

import { Badge } from "~/app/_components/badge";
import EditTrainername from "~/app/_components/ui/edit-trainername";

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
    <div className={classNames("flex", props.className)}>
      <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 ">
        {props.trainername && (
          <EditTrainername edit trainername={props.trainername} />
        )}
        {versionAndBadges.map(([pokemonVersion, badges], i) => (
          <div
            className="grid grid-cols-4 justify-items-center gap-2 sm:grid-cols-8"
            key={i}
          >
            {badges.sort().map((badgeOrder, i) => (
              <Badge
                disable={Boolean(props.trainername)}
                key={i}
                order={badgeOrder}
                version={pokemonVersion}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
