import { workoutsData } from './../../mock/workouts';
import {
  fetchAssets,
  fetchChallenges,
  fetchExercises,
  fetchHomeScreen,
  fetchPlaylists,
  // fetchUserPlaylist,
  // fetchUserProfile,
  fetchWorkouts,
} from '@t4/api/index';
import { IExercise, IWorkout, ListType, Sections } from '@t4/ui/src/modals';
import { useQuery } from '@tanstack/react-query';
import { getObjectFromArray } from 'app/utils/transformer';
import { useGender } from './useGender';
const refetchCondition = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: 3,
  // staleTime: 1000,
};

export const useHomeScreen = () => {
  const { gender } = useGender();

  return useQuery({
    queryKey: ['home', gender],
    queryFn: () =>
      fetchHomeScreen({
        gender,
      }),
    enabled: !!gender,
    ...refetchCondition,
  });
};

export const useAllWorkouts = () => {
  const { gender } = useGender();

  const query = useQuery({
    queryKey: ['workouts', gender],
    queryFn: () =>
      fetchWorkouts({
        gender,
      }),
    enabled: !!gender,
    ...refetchCondition,
  });

  const workoutsMap = getObjectFromArray(query.data);

  return {
    ...query,
    workoutsMap,
  };
};

export const useAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: () => fetchAssets(),
    ...refetchCondition,
  });
};

// export const useSongs = () => {
//   return useQuery({
//     queryKey: ['songs'],
//     queryFn: () => fetchSongs(),
//     ...refetchCondition,
//   });
// };

export const usePlaylists = (local?) => {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: () => fetchPlaylists(local),
    ...refetchCondition,
  });
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
  const { gender } = useGender();

  const {
    isLoading: isHomeScreenLoading,
    data: homeSections,
    isError: isHomeScreenError,
    refetch: homeRefetch,
    isSuccess: isHomeScreenSuccess,
    isRefetchError: isHomeRefechError,
    isRefetching: isHomeRefetching,
  } = useHomeScreen();
  const {
    isLoading: isWorkoutLoading,
    workoutsMap,
    isError: isWorkoutsError,
    refetch: workoutRefetch,
    isSuccess: isWorkoutSuccess,
    isRefetchError: isWorkoutRefechError,
    isRefetching: isWorkingRefetching,
  } = useAllWorkouts();
  // const {
  //   isLoading: isChallengesLoading,
  //   challengesMap,
  //   isError: isChallengesError,
  //   refetch: challengeRefetch,
  //   isSuccess: isChallengeSuccess
  // } = useAllChallenges();

  const sections = homeSections?.map((section: Sections) => {
    const { id, name, workoutIds, challengeIds, name_translated } = section;

    return {
      id,
      name,
      name_translated,
      type: workoutIds?.length ? ListType.workout : ListType.challenge,
      workouts: workoutIds?.map((id) => workoutsMap[id]),
      // challenges: challengeIds?.map((id) => challengesMap[id]),
      challenges: [],
    };
  });

  const refetch = () => {
    console.log('refethicng....');
    homeRefetch();
    workoutRefetch();
    // challengeRefetch();
  };

  const isLoading =
    isHomeScreenLoading || isWorkoutLoading || isHomeRefetching || isWorkingRefetching;

  const isError = isHomeScreenError || isWorkoutsError || isHomeRefechError || isWorkoutRefechError;

  console.log({ sections, homeSections });

  return {
    isLoading,
    sections,
    isError,
    isSuccess: isHomeScreenSuccess && isWorkoutSuccess,
    refetch,
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

// export const useSpotifyProfile = (accessToken: string) => {
//   return useQuery({
//     queryKey: ['spotifyProfile'],
//     queryFn: () => fetchUserProfile(accessToken),
//     ...refetchCondition,
//     enabled: !!accessToken,
//     refetchInterval: 100000000000,
//     // refetchOnMount: false,
//   });
// };

// export const useSpotifyPlaylist = ({ userId, accessToken }) => {
//   return useQuery({
//     queryKey: ['spotifyPlaylist', userId],
//     queryFn: () => fetchUserPlaylist({ userId, accessToken }),
//     ...refetchCondition,
//     enabled: !!accessToken && !!userId,
//     refetchInterval: 100000000000,
//     // refetchOnMount: false,
//   });
// };

// export const useSpotifyPlaylistTracks = ({ playlistId, accessToken }) => {
//   return useQuery({
//     queryKey: ['spotifyPlaylistTracks', playlistId],
//     queryFn: () => fetchUserPlaylistTracks({ playlistId, accessToken }),
//     ...refetchCondition,
//     enabled: !!accessToken && !!playlistId,
//     refetchInterval: 100000000000,
//     // refetchOnMount: false,
//   });
// };
