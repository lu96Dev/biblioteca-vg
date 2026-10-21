import { mockGameDetails } from '@/mocks/game-details.mock'

import type { GameSummary } from '@/features/catalog/types/game'

export const mockGames: GameSummary[] = mockGameDetails.map(
  ({ provider, externalId, title, coverUrl, releaseDate, externalRating, genres, platforms }) => ({
    provider,
    externalId,
    title,
    coverUrl,
    releaseDate,
    externalRating,
    genres,
    platforms,
  }),
)
