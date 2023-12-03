import { Sheet, SheetProps } from 'tamagui';

import { BackHandler, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { useColors } from 'app/hooks';
import { View } from '@t4/ui/src';

export interface CustomSheetProps extends SheetProps {
  scrollView?: boolean;
}

export const CustomSheet = ({
  open = false,
  onOpenChange,
  children,
  scrollView = true,
}: CustomSheetProps) => {
  const [localOpen, setLocalOpen] = useState(false);
  const { backgroundColor } = useColors();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalOpen(open);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const backAction = () => {
        if (open) {
          onOpenChange && onOpenChange(false);
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }
  }, []);

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={localOpen}
      //   onOpenChange={onOpenChange}
      onOpenChange={(open) => {
        onOpenChange && onOpenChange(open);
      }}
      dismissOnSnapToBottom
      animation="medium"
      // snapPointsMode="fit"
      // animationConfig={}
    >
      <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
      <Sheet.Handle />
      <Sheet.Frame justifyContent="center" alignItems="center" backgroundColor={backgroundColor}>
        {scrollView ? <Sheet.ScrollView>{children}</Sheet.ScrollView> : <View>{children}</View>}
      </Sheet.Frame>
    </Sheet>
  );
};
