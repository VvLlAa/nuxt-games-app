export interface GameType {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { name: string }[];
  short_screenshots: ShortScreenshotsType[];
  parent_platforms: PlatformsType;
  slug: string;
  tags: { name: string }[];
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

export interface ShortScreenshotsType {
  id: number;
  image: string;
}

export type PlatformsType = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}[];
