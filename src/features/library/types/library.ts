import type { GameSummary } from '@/features/catalog/types/game'

export type LibraryStatus = 'WANT_TO_PLAY' | 'PLAYING' | 'COMPLETED' | 'DROPPED'

export interface LibraryEntry {
  id: number
  game: GameSummary
  status: LibraryStatus
  personalRating: number | null
  hidden: boolean
  version: number
  addedAt: string
  updatedAt: string
}

export interface AddToLibraryPayload {
  status: LibraryStatus
  personalRating: number | null
  hidden: boolean
}
