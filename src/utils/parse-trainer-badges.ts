export function parseTrainerBadges(badges?: string | null) {
  if (!badges) {
    return [];
  }
  return badges.split(',').filter(Boolean).map(Number)
}
