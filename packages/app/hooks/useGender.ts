import { atom, useAtom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Gender } from '@t4/ui/src/modals';

export const genderAtom = atom<Gender | null>(null);

export function useGender() {
  const [gender, setGenderLocal] = useAtom(genderAtom);

  useEffect(() => {
    async function checkGender() {
      await AsyncStorage.getItem('gender').then((value) => {
        setGenderLocal((value as Gender) ?? Gender.FEMALE);
      });
    }

    if (!gender) {
      checkGender();
    }
  }, []);

  const setGender = (gender: Gender) => {
    setGenderLocal(gender);
    try {
      AsyncStorage.setItem('gender', gender);
    } catch {
      console.log("cound't save gender");
    }
  };

  return {
    gender,
    setGender,
  };
}
