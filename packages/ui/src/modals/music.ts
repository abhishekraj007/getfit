export type Track = {
  id: string | number;
  title: string;
  uri?: string;
  img?: string;
  author?: string;
  durationMillis: number;
};

export type Album = {
  id: string;
  name: string;
  images: Image[];
};

export type Artist = {
  id: string;
  name: string;
  images?: Image[];
};

export type Image = {
  url: string;
  height?: number;
  width?: number;
};
