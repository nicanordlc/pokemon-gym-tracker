import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type TriggerEvent, useContextMenu } from "react-contexify";
import { useApp } from "~/app/_hooks/app";
import { useTrainer } from "~/app/_hooks/trainer";
import { api } from "~/trpc/react";
import { type PokemonVersion } from "~/types";
import { getTrainer } from "~/utils/get-trainer";
import { CONTEXT_MENU_ID_BADGE } from "./ui/context-menu/badge";
import { Tooltip } from "react-tooltip";
import {
  badgeInfo,
  badgeInfoGymSize,
} from "~/app/_components/ui/modals/modal-content-badge-info/gym-metadata";

export type Badge = {
  number: number;
  version: PokemonVersion;
};

type BadgeProps = Badge & {
  disabled?: boolean;
  active?: boolean;
  size?: string;
};

export function Badge(props: BadgeProps) {
  const { app } = useApp();
  const { setBadge, trainers } = useTrainer();
  const { show } = useContextMenu({ id: CONTEXT_MENU_ID_BADGE });
  const [active, setActive] = useState(props.active ?? false);

  const tooltipId = `tooltip-${props.version}-${props.number}`;
  const badgeImageAlt = `GYM Badge #${props.number} from Pokemon ${props.version}`;
  const info = badgeInfo[props.version][props.number];

  const trainer = getTrainer({
    trainers,
    sessionPath: app.sessionId,
  });

  const updateBadge = api.trainer.updateBadges.useMutation({});

  useEffect(() => {
    if (props.active) {
      setActive(props.active);
    }
  }, [props.active]);

  const toggleActive = () => setActive((currentState) => !currentState);

  const displayMenu = (event: TriggerEvent) => {
    event.stopPropagation();

    show({
      event,
      props: {
        version: props.version,
        number: props.number,
      },
    });
  };

  const click = () => {
    toggleActive();

    if (props.disabled) {
      return;
    }

    const isActive = !active;

    setBadge({
      sessionPath: app.sessionId,
      version: props.version,
      badgeNumber: props.number,
      remove: !isActive,
    });

    updateBadge.mutate({
      version: props.version,
      badgeNumber: props.number,
      remove: !isActive,
      id: trainer.id,
    });
  };

  return (
    <>
      <button
        id={tooltipId}
        onClick={click}
        onContextMenu={displayMenu}
        className={clsx(
          "flex size-8 grayscale transition-all hover:cursor-context-menu",
          props.size ? props.size : "",
          {
            "filter-none": props.disabled ? true : active,
          },
        )}
        disabled={props.disabled}
      >
        <Image
          className={clsx("size-full", {
            "drop-shadow-[0px_0px_4px_white]": active && !props.disabled,
          })}
          src={`/badges/${props.version}/${props.number}.svg`}
          alt={badgeImageAlt}
          width={16}
          height={16}
        />
      </button>

      <Tooltip
        className="z-10 grid gap-2"
        anchorSelect={`#${tooltipId}`}
        place="top"
      >
        <p>{info?.reward.split(",")[0]}</p>

        <Image
          alt={badgeImageAlt}
          src={info?.iconPathGym ?? ""}
          width={badgeInfoGymSize.w}
          height={badgeInfoGymSize.h}
        />
      </Tooltip>
    </>
  );
}
