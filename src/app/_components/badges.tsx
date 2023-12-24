"use client";

import classNames from "classnames";
import { Badge } from "~/app/_components/badge";
import { getBadgesUrl } from "~/utils/get-badges-url";

type Props = {
  red?: string[];
  crystal?: string[];
  emerald?: string[];
  className?: string;
};

export function Badges({ className, ...badges }: Props) {
  const defaultBadges: Props = {
    red: getBadgesUrl("red"),
    crystal: getBadgesUrl("crystal"),
    emerald: getBadgesUrl("emerald"),
  };

  const shouldUseProps = badges.red ?? badges.emerald ?? badges.crystal;

  const versionAndBadges = Object.entries(
    shouldUseProps ? badges : defaultBadges,
  );

  return (
    <div
      className={classNames(
        "flex min-w-full flex-col justify-center gap-4 rounded-xl bg-white/10 p-4 sm:min-w-0 ",
        className,
      )}
    >
      {versionAndBadges.map(([pokemonVersion, badges], i) => (
        <div
          className="grid grid-cols-4 justify-items-center gap-2 sm:grid-cols-8"
          key={i}
        >
          {badges.map((badgeUrl, i) => (
            <Badge key={i} url={badgeUrl} version={pokemonVersion} />
          ))}
        </div>
      ))}
    </div>
  );
}
