import React from 'react';
import { Music } from '@tamagui/lucide-icons';
import { Button, View, useWindowDimensions } from '@t4/ui/src';
import { useRouter } from 'solito/router';

export function FloatingMusicButton() {
  const { push } = useRouter();
  const onClick = async () => {
    push('/music');
  };

  const { height } = useWindowDimensions();

  return (
    <View position="absolute" right={0} top={height / 2}>
      <Button elevate icon={<Music size={'$1'} />} circular padding={12} onPress={onClick}></Button>
    </View>
  );
}
