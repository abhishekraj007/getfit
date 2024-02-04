import { Sheet, SheetProps } from 'tamagui';

import { BackHandler, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { useColors } from 'app/hooks';
import { View } from '@t4/ui/src';

export interface CustomSheetProps extends SheetProps {
  scrollView?: boolean;
}

const SHEET_DELAY = 300;

export const CustomSheet = ({
  open = false,
  onOpenChange,
  children,
  scrollView = true,
}: CustomSheetProps) => {
  const { backgroundColor } = useColors();

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

  const [localOpen, setLocalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalOpen(open);
    }, SHEET_DELAY);

    return () => {
      timer && clearTimeout(timer);
    };
  }, [open]);

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={localOpen}
      //   onOpenChange={onOpenChange}
      onOpenChange={(open) => {
        setTimeout(() => {
          onOpenChange && onOpenChange(open);
        }, SHEET_DELAY);
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
