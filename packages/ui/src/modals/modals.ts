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
