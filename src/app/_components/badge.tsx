import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

export function Badge({ url, version }: { url: string; version?: string }) {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive((currentState) => !currentState);
  };

  return (
    <button
      // @TODO: remove data-version after it is used on the DB
      data-version={version}
      onClick={handleActive}
      className={classNames(
        "flex h-14 w-14 items-center justify-center grayscale transition-all",
        {
          "filter-none": active,
        },
      )}
    >
      <Image
        className={classNames("h-full", {
          "drop-shadow-[0px_0px_4px_white]": active,
        })}
        src={url}
        alt="GYM Badge from Pokemon fire red"
        width={100}
        height={100}
      />
    </button>
  );
}
