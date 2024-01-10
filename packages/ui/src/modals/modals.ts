export interface IWorkoutExerciseItem {
  rest_unit: 'sec' | 'min';
  sets: number;
  reps_unit: 'sec' | 'min';
  rest_value: number;
  reps_value: number;
  exerciseId: string;
}

export type translation = { [key: string]: string };

export interface IWorkout {
  id: string;
  name: string;
  name_translated?: translation;
  description: string;
  description_translated?: translation;
  image: string;
  video?: string;
  duration?: string; //  duration: '3 Days/Week',
  goal?: string;
  level?: string; // advanced/beginer
  bodypart?: string;
  equipment?: string;
  rate?: number;
  price?: string; //'free', "prmium";
  exercisesIds?: string[];
  exercises: IWorkoutExerciseItem[];
  isChallenge?: boolean;
}

export interface IChallenge {
  id: string;
  name: string;
  name_translated?: translation;
  description: string;
  description_translated?: translation;
  gender: string;
  bodyPartsIds: string[];
  duration: string;
  image: string;
  video?: string;
  goal?: string;
  price?: string;
  status?: string;
  equipmentsIds: string[];
  day_1: string[];
  day_2: string[];
  day_3: string[];
  day_4: string[];
  day_5: string[];
  day_6: string[];
  day_7: string[];
  isChallenge?: boolean;
}

export interface IExercise {
  id: string;
  video: string;
  image: string;
  title: string;
  title_translated?: translation;
  equipmentIds: string;
  bodyPartsIds: string[];
  reps: number;
  sets: number;
  tips: string;
  instructions: string;
  instructions_translated?: string;
  rest: Rest;
  rest_unit?: 'sec' | 'min';
  rest_value?: number;
  reps_unit?: 'sec' | 'rep';
  reps_value?: number;
}

export enum Status {
  active = 'active',
  inactive = 'inactive',
}

export enum ListType {
  challenge = 'challenge',
  workout = 'workout',
}

export enum RestUnit {
  sec = 'sec',
  min = 'min',
}

export interface Screen {}

export interface Sections {
  id: string;
  name: string;
  name_translated?: translation;
  workoutIds?: string[];
  challengeIds?: string[];
}

export type RestUnitType = `${RestUnit}`;

export interface Rest {
  time: number;
  unit: RestUnitType;
}

export interface ILevel {
  id: string;
  name: string;
  rate: number;
  image: string;
}

export interface IBodyPart {
  id: string;
  name: string;
  image: string;
}
export interface IEquipment {
  id: string;
  name: string;
  image: string;
}

export interface ILoadingState {
  loading?: boolean;
  hasLoaded?: boolean;
  hasError?: boolean;
}

export interface IAppStore<T> extends ILoadingState {
  data: T[];
  flatData?: { [id: string]: T };
}

export type IList = IExercise | ILevel | IEquipment | IBodyPart | IWorkout | IChallenge;

export type IListData =
  | IExercise[]
  | ILevel[]
  | IEquipment[]
  | IBodyPart[]
  | IWorkout[]
  | IChallenge[];

export type ImageObject = {
  url: string;
  height: number;
  width: number;
};

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Owner {
  external_urls: ExternalUrls;
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

// export interface PlaylistItem {
//   collaborative: boolean;
//   description: string;
//   external_urls: ExternalUrls;
//   href: string;
//   id: string;
//   images: Image[];
//   name: string;
//   owner: Owner;
//   public: boolean;
//   snapshot_id: string;
//   tracks: ITracks;
//   type: string;
//   uri: string;
// }

// export interface IPlaylists {
//   href: string;
//   limit: number;
//   next: string;
//   offset: number;
//   previous: string;
//   total: number;
//   items: PlaylistItem[];
// }
export interface IPlaylists {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: ITrack[];
}

export interface ITrack {
  id: string | number;
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string;
  duration?: number;
}

// export interface ITrack {
//   album: Album;
//   artists: Artist[];
//   available_markets: string[];
//   disc_number: number;
//   duration_ms: number;
//   explicit: boolean;
//   external_ids: ExternalIds;
//   external_urls: ExternalUrls;
//   href: string;
//   id: string;
//   is_playable: boolean;
//   linked_from: LinkedFrom;
//   restrictions: Restrictions;
//   name: string;
//   popularity: number;
//   preview_url: string;
//   track_number: number;
//   type: string;
//   uri: string;
//   is_local: boolean;
// }

export interface Followers {
  href: string;
  total: number;
}

export interface AddedBy {
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: string;
  uri: string;
}

interface Restrictions {
  reason: string;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  genres?: string[];
  followers?: Followers;
  images?: Image[];
  popularity?: number;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface LinkedFrom {}

// export interface Track {
//   album: Album;
//   artists: Artist[];
//   available_markets: string[];
//   disc_number: number;
//   duration_ms: number;
//   explicit: boolean;
//   external_ids: ExternalIds;
//   external_urls: ExternalUrls;
//   href: string;
//   id: string;
//   is_playable: boolean;
//   linked_from: LinkedFrom;
//   restrictions: Restrictions;
//   name: string;
//   popularity: number;
//   preview_url: string;
//   track_number: number;
//   type: string;
//   uri: string;
//   is_local: boolean;
// }

// export interface TrackItem {
//   added_at: string;
//   added_by: AddedBy;
//   is_local: boolean;
//   track: Track;
// }

// export interface ITracks {
//   href: string;
//   limit: number;
//   next: string;
//   offset: number;
//   previous: string;
//   total: number;
//   items: TrackItem[];
// }
