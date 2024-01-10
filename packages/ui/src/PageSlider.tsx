import { AnimatePresence } from '@tamagui/animate-presence';
import { useState } from 'react';
import { YStack, styled, useWindowDimensions } from 'tamagui';
import { IExercise } from './modals';

const YStackEnterable = styled(YStack, {
  variants: {
    isLeft: { true: { x: -300, opacity: 0 } },

    isRight: { true: { x: 300, opacity: 0 } },
  } as const,
});

interface RenderItemProps {
  item: IExercise;
  pageNumber: number;
  onNext: () => void;
  onPrev: () => void;
}

interface PageSliderProps {
  data: IExercise[];
  renderItem: ({}: RenderItemProps) => React.ReactNode;
}

export function PageSlider({ data, renderItem }: PageSliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const pageSize = data?.length;

  const sliderIndex = wrap(0, pageSize, page);
  const paginate = (newDirection: number): void => {
    setPage([page + newDirection, newDirection]);
  };

  const { width, height } = useWindowDimensions();

  const enterVariant = direction === 1 || direction === 0 ? 'isRight' : 'isLeft';

  const exitVariant = direction === 1 ? 'isLeft' : 'isRight';

  return (
    <YStack height={height} width={width} overflow="hidden" position="relative" alignItems="center">
      <AnimatePresence enterVariant={enterVariant} exitVariant={exitVariant}>
        <YStackEnterable
          key={page}
          animation="bouncy"
          fullscreen
          x={0}
          opacity={1}
          alignItems="center"
        >
          {renderItem({
            item: data[sliderIndex],
            pageNumber: sliderIndex,
            onNext: () => paginate(1),
            onPrev: () => paginate(-1),
          })}
        </YStackEnterable>
      </AnimatePresence>
    </YStack>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;

  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
