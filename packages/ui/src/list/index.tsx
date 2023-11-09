import { FlashList, FlashListProps } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { Spinner, YStack, View } from 'tamagui';
import { DocumentData } from 'firebase/firestore';
import { FlatList } from 'react-native';
import { IListData } from '../modals';

interface Props<T> {
  data: T[];
  renderItem: (item: any) => React.ReactElement;
  itemHeight?: number;
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  paddingRight?: number;
  scrollEventThrottle?: number;
  pagingEnabled?: boolean;
  scrollEnabled?: boolean;
  ref?: any;
  snapToStart?: boolean;
  onScroll?: (event: any) => void;
}

export function VirtualList<T>({
  data,
  renderItem,
  horizontal = true,
  showsHorizontalScrollIndicator,
  scrollEventThrottle,
  pagingEnabled,
  scrollEnabled = true,
  ref,
  snapToStart,
  onScroll,
}: Props<T>): React.ReactNode {
  // FlashList's API is awkward.
  const render = useCallback(
    (item) => {
      return renderItem(item.item);
    },
    [renderItem]
  );

  return (
    <FlatList
      data={data}
      renderItem={render}
      horizontal={horizontal}
      // style={{ width: '100%' }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingRight: 20 /*flexDirection: 'row-reverse'*/,
      }}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      scrollEventThrottle={scrollEventThrottle}
      pagingEnabled={pagingEnabled}
      scrollEnabled={scrollEnabled}
      ref={ref}
      snapToStart={snapToStart}
      onScroll={onScroll}
    />
  );
}
