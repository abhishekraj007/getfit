import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { ScrollView } from 'tamagui';

interface Props {
  data: any[];
  renderItem: (item: any) => React.ReactNode;
  itemHeight: number;
  horizontal?: boolean;
}

export const VirtualList = ({
  data,
  renderItem,
  itemHeight,
  horizontal = true,
}: Props): React.ReactNode => {
  if (horizontal) {
    return <CardSlider data={data} renderItem={renderItem} />;
  }

  const { top, bottom } = useSafeAreaInsets();

  const parentRef = useRef();
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current as any,
    estimateSize: () => itemHeight,
  });

  return (
    <ScrollView>
      {data.map((item) => {
        return <div key={item?.id}>{renderItem(item)}</div>;
      })}
    </ScrollView>
  );

  // return (
  //   <div
  //     ref={parentRef as any}
  //     style={{
  //       paddingTop: top,
  //       paddingBottom: bottom,
  //       height: `100%`,
  //       // overflow: 'auto', // Make it scroll!
  //     }}
  //   >
  //     {/* The large inner element to hold all of the items */}
  //     <div
  //       style={{
  //         height: `${rowVirtualizer.getTotalSize()}px`,
  //         width: '100%',
  //         position: 'relative',
  //       }}
  //     >
  //       {/* Only the visible items in the virtualizer, manually positioned to be in view */}
  //       {rowVirtualizer.getVirtualItems().map((virtualItem) => (
  //         <div
  //           key={virtualItem.key}
  //           style={{
  //             position: 'absolute',
  //             top: 0,
  //             left: 0,
  //             width: '100%',
  //             height: `${virtualItem.size}px`,
  //             transform: `translateY(${virtualItem.start}px)`,
  //           }}
  //         >
  //           {renderItem(data[virtualItem.index])}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

const CardSlider = ({ data, renderItem }) => {
  return (
    <div
      style={{
        display: 'flex',
        overflowX: 'scroll',
        overflowY: 'hidden',
        scrollbarWidth: 'none' /* For Firefox */,
        msOverflowStyle: 'none' /* For Internet Explorer and Edge */,
        // backgroundColor: 'yellow',
      }}
    >
      {data.map((item, index) => renderItem(item, index))}
    </div>
  );
};
