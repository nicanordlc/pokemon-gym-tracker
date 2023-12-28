export function parseTrainerBadges(badges: string) {
  return badges.split(',').filter(Boolean).map(Number)
}
