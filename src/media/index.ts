export enum ImageType {
  Placeholder = 'placeholder',
  PlaceholderWebp = 'placeholder_webp',
  Thumb = 'thumb',
  ThumbWebp = 'thumb_webp',
  Medium = 'medium',
  MediumWebp = 'medium_webp',
  Large = 'large',
  LargeWebp = 'large_webp',
  XLarge = 'xlarge',
  XLargeWebp = 'xlarge_webp',
  HD = 'hd',
  HDWebp = 'hd_webp',
}

export interface Image {
  type: string;
  url: string;
  height: number;
  width: number;
}

export interface Medium {
  id: string;
  images: {
    [key in ImageType]?: Image | null;
  };
}
