import React from 'react';
import { Star } from '@tamagui/lucide-icons';
import { Button, View } from '@t4/ui/src';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import { APP_REVIEW_URL } from 'app/constants';

export function ReviewApp() {
  const onRateClick = async () => {
    try {
      if (Platform.OS !== 'web') {
        await Linking.openURL(APP_REVIEW_URL);
      }
      // Check why this is not working
      // if (await StoreReview.hasAction()) {
      //   await StoreReview.requestReview();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button icon={<Star size={'$1'} />} unstyled chromeless onPress={onRateClick}></Button>
    </View>
  );
}
