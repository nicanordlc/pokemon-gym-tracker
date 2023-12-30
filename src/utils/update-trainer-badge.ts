import { type TrainerUpdateBadges } from "~/types";

export function updateTrainerBadge(props: Pick<TrainerUpdateBadges, 'badgeNumber'> & {
  badges: string;
  remove?: boolean;
}) {
  const badgeNumbers = props.badges.split(",");
  const uniqueBadges = new Set(badgeNumbers);

  if (props.remove) {
    uniqueBadges.delete(String(props.badgeNumber));
  } else {
    uniqueBadges.add(String(props.badgeNumber));
  }

  return [...uniqueBadges.values()].join(",");
}
