"use client";

import classNames from "classnames";

import EditTrainername from "~/app/_components/ui/edit-trainername";
import { useTrainer } from "~/app/_hooks/trainer";
import { type Trainer } from "@prisma/client";
import { api } from "~/trpc/react";
import { useApp } from "~/app/_hooks/app";
import { HideChildren } from "~/app/_components/hide-children";
import {
  BadgesRow,
  type BadgesRowProps,
} from "~/app/_components/ui/badges/badges-row";
import { parseTrainerBadges } from "~/utils/parse-trainer-badges";

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
  disabled?: boolean;
  title?: boolean;
  badgesSize?: string;
  highlightBadges?: Trainer;
};

export function Badges(props: BadgesProps) {
  const { updateName } = useTrainer();
  const { app } = useApp();

  const updateTrainerName = api.trainer.updateName.useMutation({});

  const badgesCount =
    (props.red?.length ?? 0) +
    (props.crystal?.length ?? 0) +
    (props.emerald?.length ?? 0);

  const badgesRowProps: Partial<BadgesRowProps> = {
    className: props.classNameBadgesRow,
    badgesSize: props.badgesSize,
    disabled: props.disabled,
  };

  const editName = (name: string) => {
    updateName({ sessionPath: app.sessionId, name });
    updateTrainerName.mutate({
      id: props.trainer?.id ?? "",
      name,
    });
  };

  const badgesInit = (badges?: number[]) => {
    const allGyms = [1, 2, 3, 4, 5, 6, 7, 8];
    return props.init ? allGyms : badges;
  };

  return (
    <div
      className={classNames(
        "flex flex-col gap-4 rounded-xl bg-white/10 p-4 ",
        props.className,
      )}
    >
      <HideChildren if={!props.trainer?.name} className="flex gap-2">
        <EditTrainername
          editable={props.editable}
          trainername={props.trainer?.name ?? ""}
          onSuccess={editName}
        />
        <p className="rounded-full border px-3">{badgesCount}</p>
      </HideChildren>

      <BadgesRow
        version="red"
        badges={badgesInit(props.red)}
        highlightBadges={parseTrainerBadges(props.highlightBadges?.badgesRed)}
        {...badgesRowProps}
      />
      <BadgesRow
        version="crystal"
        badges={badgesInit(props.crystal)}
        highlightBadges={parseTrainerBadges(
          props.highlightBadges?.badgesCrystal,
        )}
        {...badgesRowProps}
      />
      <BadgesRow
        version="emerald"
        badges={badgesInit(props.emerald)}
        highlightBadges={parseTrainerBadges(
          props.highlightBadges?.badgesEmerald,
        )}
        {...badgesRowProps}
      />
    </div>
  );
}
