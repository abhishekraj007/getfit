import { mapDocumentToEquipment } from './../app/utils/transformer';
import { db } from 'app/firebase/firebaseConfig';
import {
  mapDocumentToBodyPart,
  mapDocumentToExercise,
  mapDocumentToLevel,
} from 'app/utils/transformer';
import { CollectionReference, DocumentData, collection, getDocs } from 'firebase/firestore';

const exerciseCollection = collection(db, 'exercises');

const levelsCollection = collection(db, 'levels');
const bodyPartsCollection = collection(db, 'bodyparts');
const equipmentsCollection = collection(db, 'equipments');

const docFetcher = async (
  collection: CollectionReference<DocumentData, DocumentData>
): Promise<DocumentData[]> => {
  const data: DocumentData[] = [];
  const docs = await getDocs(collection);
  docs.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

export const fetchExercises = async () => {
  const data = await docFetcher(exerciseCollection);

  return mapDocumentToExercise(data);
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
