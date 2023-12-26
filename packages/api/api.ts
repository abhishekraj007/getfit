import {
  mapDocumentToChallenges,
  mapDocumentToEquipment,
  mapDocumentToSections,
  mapDocumentToWorkout,
} from './../app/utils/transformer';
import { db } from 'app/firebase/firebaseConfig';
import {
  mapDocumentToBodyPart,
  mapDocumentToExercise,
  mapDocumentToLevel,
} from 'app/utils/transformer';
import { CollectionReference, DocumentData, collection, getDocs } from 'firebase/firestore';
import { home } from '../mock/home';
import { workoutsData } from '../mock';

const exerciseCollection = collection(db, 'exercises');
const levelsCollection = collection(db, 'levels');
const bodyPartsCollection = collection(db, 'bodyparts');
const equipmentsCollection = collection(db, 'equipments');
const homeCollection = collection(db, 'home');
const workoutsCollection = collection(db, 'workouts');
const challengesCollection = collection(db, 'challenges');

export const docFetcher = async (collection: CollectionReference<DocumentData, DocumentData>) => {
  const data: DocumentData[] = [];
  const docs = await getDocs(collection);
  docs.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

export const fetchHomeScreen = async (local?) => {
  if (local) {
    return home;
  }

  const data = await docFetcher(homeCollection);
  return mapDocumentToSections(data);
};

export const fetchWorkouts = async (local?) => {
  if (local) {
    return workoutsData;
  }
  const data = await docFetcher(workoutsCollection);
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
