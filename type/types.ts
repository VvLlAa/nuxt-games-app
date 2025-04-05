export interface GameType {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { name: string }[];
  short_screenshots: { image: string }[];
  parent_platforms: {
    platform: { name: string; id: number };
  }[];
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  seo_title?: string;
  seo_description?: string;
  seo_h1?: string;
  seo_keywords?: string;
  nofollow?: boolean;
  nofollow_collections?: string[];
  noindex?: boolean;
  description?: string;
}
