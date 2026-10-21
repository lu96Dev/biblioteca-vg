import type { GameDetail } from '@/features/catalog/types/game'

export const mockGameDetails: GameDetail[] = [
  {
    provider: 'RAWG',
    externalId: '326243',
    title: 'Elden Ring',
    description:
      'Un RPG de acción ambientado en un amplio mundo de fantasía.',
    coverUrl: '/mocks/games/elden-ring/cover.webp',
    backgroundUrl: '/mocks/games/elden-ring/background.webp',
    releaseDate: '2022-02-25',
    developer: 'FromSoftware',
    externalRating: 9.2,
    genres: [
      { slug: 'rpg', name: 'RPG' },
      { slug: 'action', name: 'Acción' },
    ],
    platforms: [
      { slug: 'pc', name: 'PC' },
      { slug: 'playstation-5', name: 'PlayStation 5' },
      { slug: 'xbox-series-x', name: 'Xbox Series X/S' },
    ],
  },
  {
    provider: 'RAWG',
    externalId: 'hades',
    title: 'Hades',
    description:
      'Un roguelike de acción ambientado en la mitología griega.',
    coverUrl: '/mocks/games/hades/cover.webp',
    backgroundUrl: '/mocks/games/hades/background.webp',
    releaseDate: '2020-09-17',
    developer: 'Supergiant Games',
    externalRating: 9.0,
    genres: [
      { slug: 'action', name: 'Acción' },
      { slug: 'indie', name: 'Indie' },
    ],
    platforms: [
      { slug: 'pc', name: 'PC' },
      { slug: 'nintendo-switch', name: 'Nintendo Switch' },
    ],
  },
  {
    provider: 'RAWG',
    externalId: 'the-witcher-3',
    title: 'The Witcher 3: Wild Hunt',
    description:
      'Un RPG de mundo abierto centrado en la exploración, la narrativa y las decisiones.',
    coverUrl: '/mocks/games/the-witcher-3/cover.webp',
    backgroundUrl: '/mocks/games/the-witcher-3/background.webp',
    releaseDate: '2015-05-19',
    developer: 'CD Projekt Red',
    externalRating: 9.3,
    genres: [
      { slug: 'rpg', name: 'RPG' },
      { slug: 'adventure', name: 'Aventura' },
    ],
    platforms: [
      { slug: 'pc', name: 'PC' },
      { slug: 'playstation-5', name: 'PlayStation 5' },
      { slug: 'xbox-series-x', name: 'Xbox Series X/S' },
      { slug: 'nintendo-switch', name: 'Nintendo Switch' },
    ],
  },
  {
    provider: 'RAWG',
    externalId: 'hollow-knight',
    title: 'Hollow Knight',
    description:
      'Una aventura de acción y exploración ambientada en un extenso reino subterráneo.',
    coverUrl: '/mocks/games/hollow-knight/cover.webp',
    backgroundUrl: '/mocks/games/hollow-knight/background.webp',
    releaseDate: '2017-02-24',
    developer: 'Team Cherry',
    externalRating: 9.0,
    genres: [
      { slug: 'action', name: 'Acción' },
      { slug: 'adventure', name: 'Aventura' },
      { slug: 'indie', name: 'Indie' },
    ],
    platforms: [
      { slug: 'pc', name: 'PC' },
      { slug: 'nintendo-switch', name: 'Nintendo Switch' },
      { slug: 'playstation-4', name: 'PlayStation 4' },
      { slug: 'xbox-one', name: 'Xbox One' },
    ],
  },
  {
    provider: 'RAWG',
    externalId: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    description:
      'Un RPG de acción de mundo abierto ambientado en la futurista Night City.',
    coverUrl: '/mocks/games/cyberpunk-2077/cover.webp',
    backgroundUrl: '/mocks/games/cyberpunk-2077/background.webp',
    releaseDate: '2020-12-10',
    developer: 'CD Projekt Red',
    externalRating: 8.6,
    genres: [
      { slug: 'rpg', name: 'RPG' },
      { slug: 'action', name: 'Acción' },
    ],
    platforms: [
      { slug: 'pc', name: 'PC' },
      { slug: 'playstation-5', name: 'PlayStation 5' },
      { slug: 'xbox-series-x', name: 'Xbox Series X/S' },
    ],
  },
  {
    provider: 'RAWG',
    externalId: 'celeste',
    title: 'Celeste',
    description:
      'Una aventura de plataformas centrada en superar una exigente montaña.',
    coverUrl: '/mocks/games/celeste/cover.webp',
    backgroundUrl: '/mocks/games/celeste/background.webp',
    releaseDate: '2018-01-25',
    developer: 'Maddy Makes Games',
    externalRating: 8.8,
    genres: [
      { slug: 'indie', name: 'Indie' },
      { slug: 'adventure', name: 'Aventura' },
    ],
    platforms: [
      { slug: 'pc', name: 'PC' },
      { slug: 'nintendo-switch', name: 'Nintendo Switch' },
      { slug: 'playstation-4', name: 'PlayStation 4' },
      { slug: 'xbox-one', name: 'Xbox One' },
    ],
  },
  {
    provider: 'RAWG',
    externalId: 'baldurs-gate',
    title: "Baldur's Gate",
    description:
      'Un RPG basado en grupos con exploración, decisiones narrativas y combate por turnos.',
    coverUrl: '/mocks/games/baldurs-gate/cover.webp',
    backgroundUrl: '/mocks/games/baldurs-gate/background.webp',
    releaseDate: '2023-08-03',
    developer: 'Larian Studios',
    externalRating: 9.4,
    genres: [
      { slug: 'rpg', name: 'RPG' },
      { slug: 'adventure', name: 'Aventura' },
    ],
    platforms: [
      { slug: 'pc', name: 'PC' },
      { slug: 'playstation-5', name: 'PlayStation 5' },
      { slug: 'xbox-series-x', name: 'Xbox Series X/S' },
    ],
  },
  {
    provider: 'RAWG',
    externalId: 'dead-cells',
    title: 'Dead Cells',
    description:
      'Un roguelite de acción con combate rápido y exploración de niveles interconectados.',
    coverUrl: '/mocks/games/dead-cells/cover.webp',
    backgroundUrl: '/mocks/games/dead-cells/background.webp',
    releaseDate: '2018-08-07',
    developer: 'Motion Twin',
    externalRating: 8.7,
    genres: [
      { slug: 'action', name: 'Acción' },
      { slug: 'indie', name: 'Indie' },
    ],
    platforms: [
      { slug: 'pc', name: 'PC' },
      { slug: 'nintendo-switch', name: 'Nintendo Switch' },
      { slug: 'playstation-4', name: 'PlayStation 4' },
      { slug: 'xbox-one', name: 'Xbox One' },
    ],
  },
  {
    provider: 'RAWG',
    externalId: 'disco-elysium',
    title: 'Disco Elysium',
    description:
      'Un RPG narrativo centrado en conversaciones, investigación y decisiones.',
    coverUrl: '/mocks/games/disco-elysium/cover.webp',
    backgroundUrl: '/mocks/games/disco-elysium/background.webp',
    releaseDate: '2019-10-15',
    developer: 'ZA/UM',
    externalRating: 9.1,
    genres: [
      { slug: 'rpg', name: 'RPG' },
      { slug: 'indie', name: 'Indie' },
    ],
    platforms: [
      { slug: 'pc', name: 'PC' },
      { slug: 'playstation-5', name: 'PlayStation 5' },
      { slug: 'xbox-series-x', name: 'Xbox Series X/S' },
      { slug: 'nintendo-switch', name: 'Nintendo Switch' },
    ],
  },
  {
    provider: 'RAWG',
    externalId: 'outer-wilds',
    title: 'Outer Wilds',
    description:
      'Una aventura de exploración y misterio situada en un pequeño sistema solar.',
    coverUrl: '/mocks/games/outer-wilds/cover.webp',
    backgroundUrl: '/mocks/games/outer-wilds/background.webp',
    releaseDate: '2019-05-28',
    developer: 'Mobius Digital',
    externalRating: 9.0,
    genres: [
      { slug: 'adventure', name: 'Aventura' },
      { slug: 'indie', name: 'Indie' },
    ],
    platforms: [
      { slug: 'pc', name: 'PC' },
      { slug: 'playstation-5', name: 'PlayStation 5' },
      { slug: 'xbox-series-x', name: 'Xbox Series X/S' },
      { slug: 'nintendo-switch', name: 'Nintendo Switch' },
    ],
  },
]
