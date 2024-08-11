import React from 'react';
import AnimatedButton from './AnimatedButton';
import { useGender } from 'app/hooks/useGender';
import { Text } from '@t4/ui/src';
import { Gender } from '@t4/ui/src/modals';
import { Female, Male } from 'app/icons';

export function GenderSelect() {
  const { gender, setGender } = useGender();

  return (
    <AnimatedButton
      onClick={() => setGender(gender === Gender.FEMALE ? Gender.MALE : Gender.FEMALE)}
    >
      {gender === Gender.FEMALE ? <Male /> : <Female />}
    </AnimatedButton>
  );
}
