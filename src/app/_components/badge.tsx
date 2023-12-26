import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

export function Badge(props: {
  order: number;
  version?: string;
  disable?: boolean;
}) {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive((currentState) => !currentState);
  };

  return (
    <button
      onClick={handleActive}
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
        src={`/badges/${props.version}/${props.order}.svg`}
        alt="GYM Badge from Pokemon fire red"
        width={100}
        height={100}
      />
    </button>
  );
}
