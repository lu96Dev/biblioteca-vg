import type { LibraryStatus } from '@/features/library/types/library'

export interface LibraryEntryMock {
  id: number
  provider: string
  externalId: string
  status: LibraryStatus
  personalRating: number | null
  hidden: boolean
  version: number
  addedAt: string
  updatedAt: string
}

export const mockLibraryEntries: LibraryEntryMock[] = [
  {
    id: 1,
    provider: 'RAWG',
    externalId: '326243',
    status: 'PLAYING',
    personalRating: 9.5,
    hidden: false,
    version: 0,
    addedAt: '2026-10-02T18:30:00Z',
    updatedAt: '2026-10-20T19:15:00Z',
  },
  {
    id: 2,
    provider: 'RAWG',
    externalId: 'hades',
    status: 'COMPLETED',
    personalRating: 9,
    hidden: false,
    version: 0,
    addedAt: '2026-09-15T17:20:00Z',
    updatedAt: '2026-10-18T20:10:00Z',
  },
  {
    id: 3,
    provider: 'RAWG',
    externalId: 'the-witcher-3',
    status: 'COMPLETED',
    personalRating: 9.5,
    hidden: false,
    version: 0,
    addedAt: '2026-07-08T12:00:00Z',
    updatedAt: '2026-09-21T18:45:00Z',
  },
  {
    id: 4,
    provider: 'RAWG',
    externalId: 'hollow-knight',
    status: 'COMPLETED',
    personalRating: 9,
    hidden: false,
    version: 0,
    addedAt: '2026-06-14T15:30:00Z',
    updatedAt: '2026-08-30T21:00:00Z',
  },
  {
    id: 5,
    provider: 'RAWG',
    externalId: 'cyberpunk-2077',
    status: 'PLAYING',
    personalRating: 8.5,
    hidden: false,
    version: 0,
    addedAt: '2026-10-05T16:40:00Z',
    updatedAt: '2026-10-19T22:30:00Z',
  },
  {
    id: 6,
    provider: 'RAWG',
    externalId: 'celeste',
    status: 'COMPLETED',
    personalRating: 8.5,
    hidden: false,
    version: 0,
    addedAt: '2026-05-11T10:15:00Z',
    updatedAt: '2026-06-01T18:20:00Z',
  },
  {
    id: 7,
    provider: 'RAWG',
    externalId: 'baldurs-gate',
    status: 'WANT_TO_PLAY',
    personalRating: null,
    hidden: false,
    version: 0,
    addedAt: '2026-10-20T09:30:00Z',
    updatedAt: '2026-10-20T09:30:00Z',
  },
  {
    id: 8,
    provider: 'RAWG',
    externalId: 'dead-cells',
    status: 'DROPPED',
    personalRating: 7.5,
    hidden: true,
    version: 0,
    addedAt: '2026-04-03T13:00:00Z',
    updatedAt: '2026-05-17T14:25:00Z',
  },
  {
    id: 9,
    provider: 'RAWG',
    externalId: 'disco-elysium',
    status: 'WANT_TO_PLAY',
    personalRating: null,
    hidden: false,
    version: 0,
    addedAt: '2026-10-12T11:45:00Z',
    updatedAt: '2026-10-12T11:45:00Z',
  },
  {
    id: 10,
    provider: 'RAWG',
    externalId: 'outer-wilds',
    status: 'COMPLETED',
    personalRating: 10,
    hidden: false,
    version: 0,
    addedAt: '2026-03-20T19:00:00Z',
    updatedAt: '2026-04-22T20:30:00Z',
  },
]
