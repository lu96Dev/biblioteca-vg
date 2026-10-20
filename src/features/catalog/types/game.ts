// Contratos de la API (GameSummaryResponse, GameDetailResponse, LibraryStatus).
export interface NamedItem {
  slug: string;
  name: string;
}

export interface GameSummary {
  provider: string;
  externalId: string;
  title: string;
  coverUrl?: string;
  releaseDate?: string;
  externalRating?: number;
  genres: NamedItem[];
  platforms: NamedItem[];
}

export interface GameDetail extends GameSummary {
  description?: string;
  backgroundUrl?: string;
  developer?: string;
}
