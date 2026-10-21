import { ref } from 'vue'

import { mockGames } from '@/mocks/games.mock'
import { mockLibraryEntries } from '@/mocks/library.mock'

import type { GameSummary } from '@/features/catalog/types/game'
import type { AddToLibraryPayload, LibraryEntry } from '@/features/library/types/library'

function createInitialEntries(): LibraryEntry[] {
  return mockLibraryEntries.flatMap((entry) => {
    const game = mockGames.find(
      (game) => game.provider === entry.provider && game.externalId === entry.externalId,
    )

    if (!game) {
      return []
    }

    return [
      {
        id: entry.id,
        game,
        status: entry.status,
        personalRating: entry.personalRating,
        hidden: entry.hidden,
        version: entry.version,
        addedAt: entry.addedAt,
        updatedAt: entry.updatedAt,
      },
    ]
  })
}

const entries = ref<LibraryEntry[]>(createInitialEntries())

function addGame(game: GameSummary, payload: AddToLibraryPayload): LibraryEntry {
  const existingEntry = entries.value.find(
    (entry) => entry.game.provider === game.provider && entry.game.externalId === game.externalId,
  )

  if (existingEntry) {
    throw new Error('GAME_ALREADY_IN_LIBRARY')
  }

  const now = new Date().toISOString()

  const entry: LibraryEntry = {
    id: entries.value.length > 0 ? Math.max(...entries.value.map((entry) => entry.id)) + 1 : 1,

    game,

    status: payload.status,
    personalRating: payload.personalRating,
    hidden: payload.hidden,

    version: 0,
    addedAt: now,
    updatedAt: now,
  }

  entries.value.push(entry)

  return entry
}

function findEntry(provider: string, externalId: string): LibraryEntry | undefined {
  return entries.value.find(
    (entry) => entry.game.provider === provider && entry.game.externalId === externalId,
  )
}

function updateEntry(entryId: number, payload: AddToLibraryPayload): LibraryEntry {
  const entry = entries.value.find((entry) => entry.id === entryId)

  if (!entry) {
    throw new Error('LIBRARY_ENTRY_NOT_FOUND')
  }

  entry.status = payload.status
  entry.personalRating = payload.personalRating
  entry.hidden = payload.hidden
  entry.version += 1
  entry.updatedAt = new Date().toISOString()

  return entry
}

function removeEntry(entryId: number): void {
  const index = entries.value.findIndex(
    (entry) => entry.id === entryId,
  )

  if (index === -1) {
    throw new Error('LIBRARY_ENTRY_NOT_FOUND')
  }

  entries.value.splice(index, 1)
}

export function useLibrary() {
  return {
    entries,
    addGame,
    updateEntry,
    removeEntry,
    findEntry,
  }
}
