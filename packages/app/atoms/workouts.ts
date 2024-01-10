import { atom, useAtom } from 'jotai';

export const selectedWorkoutAtom = atom<string | undefined>(undefined);

export const useWorktouAtom = () => {
  const [selectedWorkout, updatedSelectedWorkout] = useAtom(selectedWorkoutAtom);

  return {
    selectedWorkout,
    updatedSelectedWorkout,
  };
};
