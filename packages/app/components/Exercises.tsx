import { IExercise } from '@t4/ui/src/modals';
import { SolitoImage } from 'solito/image';
import {
  YStack,
  Card,
  Paragraph,
  XStack,
  H5,
  useWindowDimensions,
  Button,
  ScrollView,
} from '@t4/ui/src';
import { LIST_MISSING_IMAGE } from 'app/constants/images';
import { useColors } from 'app/hooks';
import { useLanguage, useTranslation } from 'app/provider/language';
import { useState } from 'react';
import { CustomSheet } from './CustomSheet';
import { ExerciseDetail } from './ExerciseDetail';

function ECard({ item }: { item: IExercise }) {
  const { width } = useWindowDimensions();
  const { backgroundColor, textPrimary, textSecondary } = useColors();
  const { lang } = useLanguage();
  const [showDetail, setShowDetail] = useState(false);
  // const { push } = useRouter();

  return (
    <Card
      borderWidth={0}
      borderRadius={0}
      animation="bouncy"
      width={width}
      hoverStyle={{ scale: 0.99, opacity: 0.95 }}
      pressStyle={{ scale: 0.96, opacity: 0.9 }}
      exitStyle={{ scale: 1, opacity: 1 }}
      backgroundColor={backgroundColor}
      // onPress={() => push(`/exercise/${item.id}`)}
      onPress={() => setShowDetail(true)}
    >
      <XStack alignItems="center">
        <SolitoImage
          src={item?.image ?? LIST_MISSING_IMAGE}
          width={50}
          height={50}
          alt={item.title}
          unoptimized
        />

        <YStack paddingVertical={'$3'} paddingHorizontal={'$4'}>
          <H5 color={textPrimary}>{item.title_translated?.[lang] ?? item.title}</H5>
          {item.reps_unit === 'rep' ? (
            <Paragraph color={textSecondary}>X {item.reps_value}</Paragraph>
          ) : (
            <Paragraph color={textSecondary}>00:{item.reps_value}</Paragraph>
          )}
        </YStack>
      </XStack>

      {showDetail && (
        <CustomSheet open={showDetail} onOpenChange={setShowDetail} scrollView={false}>
          <ExerciseDetail exercise={item} lang={lang} />
        </CustomSheet>
      )}
    </Card>
  );
}

export function Exercises({ exercises, onStart }: { exercises: IExercise[]; onStart }) {
  const { height } = useWindowDimensions();
  const translation = useTranslation();

  return (
    <YStack position="relative">
      <ScrollView showsVerticalScrollIndicator={false} height={height - 420}>
        {exercises.map((item) => (
          <ECard key={item.id} item={item} />
        ))}
      </ScrollView>

      <XStack position="relative" justifyContent="center" marginTop={-60} borderRadius={'$5'}>
        <Button
          size="$6"
          themeInverse
          width={280}
          animation="bouncy"
          pressStyle={{ scale: 0.96, opacity: 0.9 }}
          onPress={onStart}
          borderRadius={50}
        >
          {translation?.letsgo}
        </Button>
      </XStack>
    </YStack>
  );
}
