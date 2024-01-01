import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useApp } from "~/app/_hooks/app";
import { useTrainer } from "~/app/_hooks/trainer";
import { api } from "~/trpc/react";
import { type PokemonVersion } from "~/types";
import { getTrainer } from "~/utils/get-trainer";

export function Badge(props: {
  number: number;
  version: PokemonVersion;
  disable?: boolean;
  active?: boolean;
  notrack?: boolean;
  size?: string;
}) {
  const { app } = useApp();
  const { setBadge, trainers } = useTrainer();

  const trainer = getTrainer({
    trainers,
    sessionPath: app.sessionId,
  });

  const [active, setActive] = useState(props.active ?? false);

  const toggleActive = () => setActive((currentState) => !currentState);

  const updateBadge = api.trainer.updateBadges.useMutation({});

  useEffect(() => {
    if (props.active) {
      setActive(props.active);
    }
  }, [props.active]);

  const click = () => {
    toggleActive();

    if (props.notrack) {
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
      className={classNames(
        "flex size-8 grayscale transition-all",
        props.size ? props.size : "",
        {
          "filter-none": props.disable ? true : active,
        },
      )}
      disabled={props.disable}
    >
      <Image
        className={classNames("size-full", {
          "drop-shadow-[0px_0px_4px_white]": active && !props.disable,
        })}
        src={`/badges/${props.version}/${props.number}.svg`}
        alt={`GYM Badge #${props.number} from Pokemon ${props.version}`}
        width={16}
        height={16}
      />
    </button>
  );
}
