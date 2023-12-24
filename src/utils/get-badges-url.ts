type PokemonVersion = 'red' | 'crystal' | 'emerald'

export function getBadgesUrl(version: PokemonVersion) {
  const badges = (a: string) => Array(8)
    .fill(null)
    .map((_, i) => i + 1)
    .map((badgeName) => `/badges/${a}/${badgeName}.svg`);
  switch (version) {
    case 'red':
      return badges('red')
    case 'crystal':
      return badges('crystal')
    case 'emerald':
      return badges('emerald')
    default:
      return [];
  }
}
