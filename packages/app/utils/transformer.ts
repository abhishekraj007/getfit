import {
  IAssets,
  IBodyPart,
  IChallenge,
  IEquipment,
  IExercise,
  ILevel,
  IListData,
  IPlaylists,
  IWorkout,
  Sections,
} from '@t4/ui/src/modals';
import { DocumentData } from 'firebase/firestore';

export const mapDocumentToExercise = (data: DocumentData[]): IExercise[] => {
  return data.map(
    ({
      id,
      video,
      image,
      rest,
      title,
      equipment,
      body_parts,
      reps,
      sets,
      tips,
      instructions,
      title_translated,
      instructions_translated,
    }) => {
      const body_partsIds: string[] = (body_parts ?? []).map(({ id }) => id);

      return {
        id,
        video,
        image,
        rest,
        title,
        title_translated,
        instructions,
        instructions_translated,
        equipmentIds: equipment?.id,
        bodyPartsIds: body_partsIds,
        reps,
        sets,
        tips,
      };
    }
  );
};

export const mapDocumentToChallenges = (data: DocumentData[]): IChallenge[] => {
  return data.map(
    ({
      id,
      video,
      image,
      name,
      equipments,
      bodyparts,
      description,
      day_1,
      day_2,
      day_3,
      day_4,
      day_5,
      day_6,
      day_7,
      duration,
      gender,
      goal,
      price,
      status,
      isChallenge,
    }) => {
      return {
        id,
        video,
        image,
        name,
        equipmentsIds: (equipments ?? []).map((eq) => eq.id),
        bodyPartsIds: (bodyparts ?? []).map((eq) => eq.id),
        description,
        day_1,
        day_2,
        day_3,
        day_4,
        day_5,
        day_6,
        day_7,
        duration,
        gender,
        goal,
        price,
        status,
        isChallenge,
      };
    }
  );
};

export const mapDocumentToWorkout = (data: DocumentData[]): IWorkout[] => {
  return data.map(
    ({
      id,
      name,
      name_translated,
      duration,
      description,
      description_translated,
      image,
      exercises,
      video,
      level,
    }) => {
      return {
        id,
        name,
        name_translated,
        description,
        description_translated,
        duration,
        image,
        exercises: (exercises ?? []).map((item) => {
          const { exercise, ...rest } = item;
          return { ...rest, exerciseId: exercise?.id };
        }),
        video,
        levelId: level?.id,
      };
    }
  );
};

export const mapDocumentToSections = (data: DocumentData[]): Sections[] => {
  return data.map(({ id, name, workoutIds, challengeIds, name_translated }) => {
    return {
      id,
      name,
      name_translated,
      workoutIds: (workoutIds ?? []).map(({ id }) => id),
      challengeIds: (challengeIds ?? []).map(({ id }) => id),
    };
  });
};

export const mapDocumentToAssets = (data: DocumentData[]): IAssets => {
  const images = data.reduce((acc, item) => {
    return {
      ...acc,
      ...(item?.images ?? {}),
    };
  }, {});

  const texts = data.reduce((acc, item) => {
    return {
      ...acc,
      ...(item?.texts_translated ?? {}),
    };
  }, {});

  return {
    images,
    texts,
  };
};

// export const mapDocumentToSongs = (data: DocumentData[]): Track[] => {
//   return data.map(({ id, title, uri, image, author, duration, tags }) => {
//     return {
//       id,
//       title,
//       uri,
//       img: image,
//       author,
//       durationMillis: duration ?? 0,
//       tags: tags ?? [],
//     };
//   });
// };

export const mapDocumentToPlaylists = (data: DocumentData[]): IPlaylists[] => {
  return data.map(({ id, name, description, image, tracks }) => {
    return {
      id,
      name,
      description,
      image,
      tracks,
    };
  });
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

export const getObjectFromArray = (data: IListData | undefined = []) => {
  return data.reduce((acc, nextItem) => {
    return {
      ...acc,
      [nextItem.id]: nextItem,
    };
  }, {});
};
