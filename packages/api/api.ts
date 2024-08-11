import {
  mapDocumentToAssets,
  mapDocumentToChallenges,
  mapDocumentToEquipment,
  mapDocumentToPlaylists,
  mapDocumentToSections,
  mapDocumentToWorkout,
} from './../app/utils/transformer';
import { db } from 'app/firebase/firebaseConfig';
import {
  mapDocumentToBodyPart,
  mapDocumentToExercise,
  mapDocumentToLevel,
} from 'app/utils/transformer';
import {
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { home } from '../mock/home';
import { workoutsData } from '../mock';
import { IPlaylists, Gender } from '@t4/ui/src/modals';
import playlists from '../mock/playlists.json';

const exerciseCollection = collection(db, 'exercises');
const levelsCollection = collection(db, 'levels');
const bodyPartsCollection = collection(db, 'bodyparts');
const equipmentsCollection = collection(db, 'equipments');
// const homeCollection = collection(db, 'home').where("gender", "array-contains", "male")

const homeCollection = collection(db, 'home');
const workoutsCollection = collection(db, 'workouts');
const challengesCollection = collection(db, 'challenges');
const playlistsCollection = collection(db, 'playlists');
const assetsCollection = collection(db, 'assets');

const SPOTIFY_API_ENDPOINT = 'https://api.spotify.com/v1';

export const docFetcher = async (collection: CollectionReference<DocumentData, DocumentData>) => {
  const data: DocumentData[] = [];
  const docs = await getDocs(collection);
  docs.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

export const docFetcherByParams = async (
  collection: CollectionReference<DocumentData, DocumentData>,
  gender: Gender | null
) => {
  const data: DocumentData[] = [];

  console.log('=====docFetcherBy===', gender);

  const eventsQuery = query(collection, where('gender', '==', gender));

  const docs = await getDocs(eventsQuery);

  docs.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  // console.log({ data });

  return data;
};

export interface ApiParams {
  gender: Gender | null;
  local?: boolean;
}

export const fetchHomeScreen = async ({ local, gender }: ApiParams) => {
  if (local) {
    return home;
  }

  const data = await docFetcherByParams(homeCollection, gender);

  return mapDocumentToSections(data);
};

export const fetchAssets = async (local?) => {
  const data = await docFetcher(assetsCollection);
  const result = mapDocumentToAssets(data);

  return result;
};

export const fetchPlaylists = async (local?) => {
  if (local) {
    return JSON.parse(JSON.stringify(playlists));
  }

  const data = await docFetcher(playlistsCollection);
  return mapDocumentToPlaylists(data);
};

export const fetchWorkouts = async ({ local, gender }: ApiParams) => {
  if (local) {
    return workoutsData;
  }
  // const data = await docFetcher(workoutsCollection);

  const data = await docFetcherByParams(workoutsCollection, gender);
  return mapDocumentToWorkout(data);
};

export const fetchExercises = async () => {
  const data = await docFetcher(exerciseCollection);

  return mapDocumentToExercise(data);
};

export const fetchChallenges = async () => {
  const data = await docFetcher(challengesCollection);

  return mapDocumentToChallenges(data);
};

export const fetchLevels = async () => {
  const data = await docFetcher(levelsCollection);

  return mapDocumentToLevel(data);
};

export const fetchBodyParts = async () => {
  const data = await docFetcher(bodyPartsCollection);

  return mapDocumentToBodyPart(data);
};

export const fetchEquipments = async () => {
  const data = await docFetcher(equipmentsCollection);

  return mapDocumentToEquipment(data);
};

export const fetchUserProfile = async (accessToken: string) => {
  const response = await fetch(`${SPOTIFY_API_ENDPOINT}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

export const fetchUserPlaylist = async ({ userId, accessToken }): Promise<IPlaylists> => {
  const response = await fetch(`${SPOTIFY_API_ENDPOINT}/users/${userId}/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

// export const fetchUserPlaylistTracks = async ({ playlistId, accessToken }): Promise<ITracks> => {
//   const response = await fetch(`${SPOTIFY_API_ENDPOINT}/playlists/${playlistId}/tracks`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   return await response.json();
// };
