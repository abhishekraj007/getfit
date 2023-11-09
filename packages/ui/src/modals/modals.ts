export interface IWorkout {
  id: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  duration: string; //  duration: '3 Days/Week',
  goal: string;
  level: string; // advanced/beginer
  bodypart: string;
  equipment: string;
  rate: number;
  price: string; //'free', "prmium";
}

export enum RestUnit {
  sec = 'sec',
  min = 'min',
}

export type RestUnitType = `${RestUnit}`;

export interface Rest {
  time: number;
  unit: RestUnitType;
}

export interface IExercise {
  id: string;
  video: string;
  image: string;
  title: string;
  equipment: string;
  body_parts: string[];
  reps: number;
  sets: number;
  tips: string;
  instructions: string;
  rest: Rest;
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

export type IListData = IExercise[] | ILevel[] | IEquipment[] | IBodyPart[] | IWorkout[];
