"use client";

import classNames from "classnames";
import { Badge } from "~/app/_components/badge";
import { getBadgesUrl } from "~/utils/get-badges-url";

export function Badges({ className, ...badges }: {
  red?: string[];
  crystal?: string[];
  emerald?: string[];
  className?: string;
}) {
  const defaultBadges = {
    red: getBadgesUrl("red"),
    crystal: getBadgesUrl("crystal"),
    emerald: getBadgesUrl("emerald"),
  };

  const shouldUseProps = badges.red ?? badges.emerald ?? badges.crystal;

  const versionAndBadges = Object.entries(
    shouldUseProps ? badges : defaultBadges,
  );

  return (
    <div className={classNames("flex", className)}>
      <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 ">
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
    </div>
  );
}
