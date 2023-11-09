import { fetchBodyParts, fetchEquipments, fetchExercises, fetchLevels } from '@t4/api/index';
import {
  bodyPartsData,
  equipmentsData,
  exercisesData,
  levelsData,
  workoutsData,
} from '@t4/api/mock';
import { useToastController } from '@t4/ui/src';
import { useBodyParts, useEquipments, useExercises, useLevels, useWorkouts } from 'app/stores';
import { getObjectFromArray } from 'app/utils/transformer';
import { useEffect } from 'react';

export default function useAppData() {
  const [exercises, setExercises] = useExercises();
  const [workouts, setWorkouts] = useWorkouts();
  const [levels, setLevels] = useLevels();
  const [equipments, setEquipements] = useEquipments();
  const [bodyParts, setBodyParts] = useBodyParts();

  const toast = useToastController();

  const getExercises = async () => {
    if (!exercises.hasLoaded) {
      let exercisesClone = exercises;

      try {
        // const data = await fetchExercises();
        // setExercises(data);

        exercisesClone = {
          ...exercisesClone,
          data: exercisesData,
          flatData: getObjectFromArray(exercisesData),
        };
      } catch (error) {
        exercisesClone = {
          ...exercisesClone,
          hasError: true,
        };

        toast.show('Oops!!', {
          message: 'Something went wrong, while getting exercises.',
        });
      } finally {
        exercisesClone = {
          ...exercisesClone,
          loading: false,
          hasLoaded: true,
        };

        setExercises(exercisesClone);
      }
    }
  };

  const getWorkouts = async () => {
    if (!workouts.hasLoaded) {
      let workoutsClone = workouts;

      try {
        // const data = await fetchworkouts();
        // setworkouts(data);

        workoutsClone = {
          ...workoutsClone,
          data: workoutsData,
          flatData: getObjectFromArray(workoutsData),
        };
      } catch (error) {
        workoutsClone = {
          ...workoutsClone,
          hasError: true,
        };

        toast.show('Oops!!', {
          message: 'Something went wrong, while getting workouts.',
        });
      } finally {
        workoutsClone = {
          ...workoutsClone,
          loading: false,
          hasLoaded: true,
        };

        setWorkouts(workoutsClone);
      }
    }
  };

  const getLevels = async () => {
    if (!levels.hasLoaded) {
      let levelsClone = levels;

      try {
        // const data = await fetchlevels();
        // setlevels(data);

        levelsClone = {
          ...levelsClone,
          data: levelsData,
          flatData: getObjectFromArray(levelsData),
        };
      } catch (error) {
        levelsClone = {
          ...levelsClone,
          hasError: true,
        };

        toast.show('Oops!!', {
          message: 'Something went wrong, while getting levels.',
        });
      } finally {
        levelsClone = {
          ...levelsClone,
          loading: false,
          hasLoaded: true,
        };

        setLevels(levelsClone);
      }
    }
  };

  const getEquipments = async () => {
    if (!equipments.hasLoaded) {
      let equipmentsClone = equipments;

      try {
        // const data = await fetchequipments();
        // setequipments(data);

        equipmentsClone = {
          ...equipmentsClone,
          data: equipmentsData,
          flatData: getObjectFromArray(equipmentsData),
        };
      } catch (error) {
        equipmentsClone = {
          ...equipmentsClone,
          hasError: true,
        };

        toast.show('Oops!!', {
          message: 'Something went wrong, while getting equipments.',
        });
      } finally {
        equipmentsClone = {
          ...equipmentsClone,
          loading: false,
          hasLoaded: true,
        };

        setEquipements(equipmentsClone);
      }
    }
  };

  const getBodyParts = async () => {
    if (!bodyParts.hasLoaded) {
      let bodyPartsClone = bodyParts;

      try {
        // const data = await fetchbodyParts();
        // setbodyParts(data);

        bodyPartsClone = {
          ...bodyPartsClone,
          data: bodyPartsData,
          flatData: getObjectFromArray(bodyPartsData),
        };
      } catch (error) {
        bodyPartsClone = {
          ...bodyPartsClone,
          hasError: true,
        };

        toast.show('Oops!!', {
          message: 'Something went wrong, while getting bodyParts.',
        });
      } finally {
        bodyPartsClone = {
          ...bodyPartsClone,
          loading: false,
          hasLoaded: true,
        };

        setBodyParts(bodyPartsClone);
      }
    }
  };

  useEffect(() => {
    getExercises();
    getLevels();
    getEquipments();
    getBodyParts();
    getWorkouts();
  }, []);

  return {
    exercises,
    levels,
    equipments,
    bodyParts,
    workouts,
  };
}
