import { fetchChallenges, fetchExercises, fetchHomeScreen, fetchWorkouts } from '@t4/api/index';
import { IExercise, IWorkout, ListType, Sections } from '@t4/ui/src/modals';
import { useQuery } from '@tanstack/react-query';
import { getObjectFromArray } from 'app/utils/transformer';

const refetchCondition = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  //   staleTime: 6000 * 6000
};

export const useHomeScreen = () => {
  return useQuery({
    queryKey: ['home'],
    queryFn: () => fetchHomeScreen(),
    ...refetchCondition,
  });
};

export const useAllWorkouts = () => {
  const query = useQuery({
    queryKey: ['workouts'],
    queryFn: () => fetchWorkouts(),
    ...refetchCondition,
  });

  const workoutsMap = getObjectFromArray(query.data);

  return {
    ...query,
    workoutsMap,
  };
};

export const useAllChallenges = () => {
  const query = useQuery({
    queryKey: ['challenges'],
    queryFn: () => fetchChallenges(),
    ...refetchCondition,
  });

  const challengesMap = getObjectFromArray(query.data);

  return {
    ...query,
    challengesMap,
  };
};

export const useAllExercises = () => {
  const query = useQuery({
    queryKey: ['exercises'],
    queryFn: () => fetchExercises(),
    ...refetchCondition,
  });

  const exercisesMap = getObjectFromArray(query.data);

  return {
    ...query,
    exercisesMap,
  };
};

export const useSections = () => {
  const { isLoading: isHomeScreenLoading, data: homeSections } = useHomeScreen();
  const { isLoading: isWorkoutLoading, workoutsMap } = useAllWorkouts();
  const { isLoading: isChallengesLoading, challengesMap } = useAllChallenges();

  const sections = homeSections?.map((section: Sections) => {
    const { id, name, workoutIds, challengeIds } = section;

    return {
      id,
      name,
      type: workoutIds?.length ? ListType.workout : ListType.challenge,
      workouts: workoutIds?.map((id) => workoutsMap[id]),
      challenges: challengeIds?.map((id) => challengesMap[id]),
    };
  });

  return {
    isLoading: isHomeScreenLoading || isWorkoutLoading || isChallengesLoading,
    sections,
  };
};

export const useExercisesByWorkoutId = (workoutId: string) => {
  const { isLoading: isWorkoutLoading, workoutsMap } = useAllWorkouts();
  const { isLoading: isExLoading, exercisesMap } = useAllExercises();

  const workoutDetail: IWorkout = workoutsMap[workoutId];
  const exercises = workoutDetail?.exercises?.map((exercise) => {
    return {
      ...exercisesMap[exercise.exerciseId],
      ...exercise,
    };
  });

  const isLoading = isWorkoutLoading || isExLoading;

  return {
    workoutDetail,
    exercises,
    isLoading,
  };
};

export const useExercisesByChallengeId = (id: string, day) => {
  const { isLoading: isChallengeLoading, challengesMap } = useAllChallenges();
  const { isLoading: isExLoading, exercisesMap } = useAllExercises();

  const challengeDetail: IWorkout = challengesMap[id];
  const exercisesIds = challengeDetail?.[`day_${day}`]?.map((ex: IExercise) => ex?.id);
  const exercises = (exercisesIds ?? []).map((id: string) => exercisesMap[id]);

  const isLoading = isChallengeLoading || isExLoading;

  return {
    challengeDetail,
    exercises,
    isLoading,
  };
};
