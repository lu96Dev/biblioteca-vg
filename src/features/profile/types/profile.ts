export type LibraryVisibility =
  | 'PUBLIC'
  | 'PRIVATE'

export interface UserProfile {
  username: string
  bio: string
  avatarUrl: string
  bannerUrl: string
  libraryVisibility: LibraryVisibility
}

export interface UpdateProfilePayload {
  username: string
  bio: string
  avatarUrl: string
  bannerUrl: string
  libraryVisibility: LibraryVisibility
}
