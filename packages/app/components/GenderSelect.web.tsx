import React from 'react';
import AnimatedButton from './AnimatedButton';
import { useGender } from 'app/hooks/useGender';
import { Gender } from '@t4/ui/src/modals';

export function GenderSelect() {
  const { gender, setGender } = useGender();

  return (
    <AnimatedButton
      onClick={() => setGender(gender === Gender.FEMALE ? Gender.MALE : Gender.FEMALE)}
    >
      {gender === Gender.FEMALE ? 'Male' : 'Female'}
    </AnimatedButton>
  );
}
