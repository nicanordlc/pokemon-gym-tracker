import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTrainer } from "~/app/_hooks/trainer";
import { api } from "~/trpc/react";
import { type PokemonVersion } from "~/types";

export function Badge(props: {
  number: number;
  version: PokemonVersion;
  disable?: boolean;
  active?: boolean;
  notrack?: boolean;
}) {
  const { setBadge, trainer } = useTrainer();

  const [active, setActive] = useState(props.active ?? false);

  const toggleActive = () => setActive((currentState) => !currentState);

  const updateBadge = api.trainer.update.useMutation({});

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
        "flex h-14 w-14 items-center justify-center grayscale transition-all",
        {
          "filter-none": props.disable ? true : active,
        },
      )}
      disabled={props.disable}
    >
      <Image
        className={classNames("h-full", {
          "drop-shadow-[0px_0px_4px_white]": active && !props.disable,
        })}
        src={`/badges/${props.version}/${props.number}.svg`}
        alt="GYM Badge from Pokemon fire red"
        width={100}
        height={100}
      />
    </button>
  );
}
