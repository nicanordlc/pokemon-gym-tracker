"use client";

import classNames from "classnames";
import { Badge } from "~/app/_components/badge";
import { getBadgesUrl } from "~/utils/get-badges-url";

type BadgesProps = {
  red?: string[];
  crystal?: string[];
  emerald?: string[];
};

export function Badges({
  className,
  username,
  init,
  ...badges
}: BadgesProps & {
  className?: string;
  username?: string;
  init?: boolean;
}) {
  let prepareVersionAndBadges: BadgesProps | [] = [];
  const shouldUseProps = badges.red ?? badges.emerald ?? badges.crystal;

  if (shouldUseProps) {
    prepareVersionAndBadges = badges;
  } else {
    if (init) {
      const defaultBadges = {
        red: getBadgesUrl("red"),
        crystal: getBadgesUrl("crystal"),
        emerald: getBadgesUrl("emerald"),
      };

      prepareVersionAndBadges = defaultBadges;
    }
  }

  const versionAndBadges = Object.entries(prepareVersionAndBadges);

  return (
    <div className={classNames("flex", className)}>
      <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 ">
        {username && <p>{username}</p>}
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
