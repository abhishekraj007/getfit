import React from 'react';
import { Share as ShareIcon } from '@tamagui/lucide-icons';
import { Button, View } from '@t4/ui/src';
import { Share } from 'react-native';
import { APP_URL } from 'app/constants';

export function ShareApp() {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey! Did you try this fitness and workout app? ${APP_URL}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button icon={<ShareIcon size={'$1'} />} unstyled chromeless onPress={onShare}></Button>
    </View>
  );
}
