import type { GameSummary } from '@/features/catalog/types/game'

export const mockGames: GameSummary[] = [
  {
    provider: 'RAWG',
    externalId: '326243',
    title: 'Elden Ring',
    releaseDate: '2022-02-25',
    externalRating: 9.2,
    genres: [
      {
        slug: 'rpg',
        name: 'RPG',
      },
    ],
    platforms: [
      {
        slug: 'pc',
        name: 'PC',
      },
      {
        slug: 'playstation-5',
        name: 'PlayStation 5',
      },
    ],
  },

  {
    provider: 'RAWG',
    externalId: 'hades',
    title: 'Hades',
    releaseDate: '2020-09-17',
    externalRating: 9.0,
    genres: [
      {
        slug: 'action',
        name: 'Acción',
      },
      {
        slug: 'indie',
        name: 'Indie',
      },
    ],
    platforms: [
      {
        slug: 'pc',
        name: 'PC',
      },
    ],
  },
]
