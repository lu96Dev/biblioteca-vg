import type {
  GameDetail,
  GameSummary,
} from '@/features/catalog/types/game'

export function filterGames(
  games: GameSummary[],
  search: string,
  genre: string,
): GameSummary[] {
  const normalizedSearch = search.trim().toLowerCase()

  return games.filter((game) => {
    const matchesSearch =
      !normalizedSearch ||
      game.title.toLowerCase().includes(normalizedSearch)

    const matchesGenre =
      genre === 'all' ||
      game.genres.some((item) => item.slug === genre)

    return matchesSearch && matchesGenre
  })
}

export function getGameDetailPath(
  game: Pick<GameSummary, 'provider' | 'externalId'>,
): string {
  return `/games/${encodeURIComponent(
    game.provider,
  )}/${encodeURIComponent(game.externalId)}`
}

export function findGameDetail(
  games: GameDetail[],
  provider: string,
  externalId: string,
): GameDetail | undefined {
  return games.find(
    (game) =>
      game.provider.toLowerCase() === provider.toLowerCase() &&
      game.externalId === externalId,
  )
}
