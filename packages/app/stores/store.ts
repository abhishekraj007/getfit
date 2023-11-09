import { atom, useAtom } from 'jotai';
import { IAppStore, IBodyPart, IEquipment, IExercise, ILevel, IWorkout } from '@t4/ui/src/modals';

const initialData = {
  data: [],
  loading: true,
  hasLoaded: false,
  hasError: false,
  flatData: {},
};

const exercises = atom<IAppStore<IExercise>>(initialData);
const workouts = atom<IAppStore<IWorkout>>(initialData);
const levels = atom<IAppStore<ILevel>>(initialData);
const equipments = atom<IAppStore<IEquipment>>(initialData);
const bodyParts = atom<IAppStore<IBodyPart>>(initialData);

export const useExercises = () => {
  return useAtom(exercises);
};

export const useWorkouts = () => {
  return useAtom(workouts);
};

export const useLevels = () => {
  return useAtom(levels);
};

export const useEquipments = () => {
  return useAtom(equipments);
};

export const useBodyParts = () => {
  return useAtom(bodyParts);
};
