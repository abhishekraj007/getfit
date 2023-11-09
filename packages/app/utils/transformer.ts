import { IBodyPart, IEquipment, IExercise, ILevel, IListData, IWorkout } from '@t4/ui/src/modals';
import { DocumentData } from 'firebase/firestore';

export const mapDocumentToExercise = (data: DocumentData[]): IExercise[] => {
  return data.map(
    ({ id, video, image, rest, title, equipment, body_parts, reps, sets, tips, instructions }) => {
      const body_partsIds: string[] = body_parts.map(({ id }) => id);

      return {
        id,
        video,
        image,
        rest,
        title,
        equipment: equipment.id,
        body_parts: body_partsIds,
        reps,
        sets,
        tips,
        instructions,
      };
    }
  );
};

export const mapDocumentToLevel = (data: DocumentData[]): ILevel[] => {
  return data.map(({ id, image, name, rate }) => {
    return {
      id,
      image,
      name,
      rate,
    };
  });
};

export const mapDocumentToEquipment = (data: DocumentData[]): IEquipment[] => {
  return data.map(({ id, image, name }) => {
    return {
      id,
      image,
      name,
    };
  });
};

export const mapDocumentToBodyPart = (data: DocumentData[]): IBodyPart[] => {
  return data.map(({ id, image, name }) => {
    return {
      id,
      image,
      name,
    };
  });
};

export const getObjectFromArray = (data: IListData) => {
  return data.reduce((acc, nextItem) => {
    return {
      ...acc,
      [nextItem.id]: nextItem,
    };
  }, {});
};
