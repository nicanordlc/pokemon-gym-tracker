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

  const trainer = getTrainer({
    trainers,
    sessionPath: app.sessionId,
  });

  const [active, setActive] = useState(props.active ?? false);

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
    <button
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
        alt={`GYM Badge #${props.number} from Pokemon ${props.version}`}
        width={16}
        height={16}
      />
    </button>
  );
}
