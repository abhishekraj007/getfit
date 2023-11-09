import { useExercises } from 'app/stores';
import { IExercise } from '@t4/ui/src/modals';
import { SolitoImage } from 'solito/image';
import { Link } from 'solito/link';
import {
  YStack,
  VirtualList,
  Card,
  Paragraph,
  Spinner,
  H6,
  XStack,
  View,
  Text,
  H5,
  useThemeName,
  Theme,
  useWindowDimensions,
  Button,
  ScrollView,
} from '@t4/ui/src';
import { Play } from '@tamagui/lucide-icons';
import { useRouter } from 'solito/router';

function ECard({ item }: { item: IExercise }) {
  const themeName = useThemeName();
  const backgroundColor = themeName.includes('dark') ? '$background' : 'white';
  const { width } = useWindowDimensions();

  return (
    <Card
      size="$4"
      bordered
      borderRadius={0}
      animation="bouncy"
      width={width}
      hoverStyle={{ scale: 0.99, opacity: 0.95 }}
      pressStyle={{ scale: 0.96, opacity: 0.9 }}
      exitStyle={{ scale: 1, opacity: 1 }}
      backgroundColor={backgroundColor}
    >
      <XStack alignItems="center" paddingRight="$4">
        <View alignItems="center">
          <SolitoImage src={item.image} width={50} height={50} alt={item.title} unoptimized />
        </View>

        <Card.Header width={'100%'}>
          <H5>{item.title}</H5>
          <Paragraph theme="alt1">X {item.reps}</Paragraph>
        </Card.Header>
      </XStack>
    </Card>
  );
}

export function Exercises({ workoutId }: { workoutId: string }) {
  const [exercises] = useExercises();
  const { data, loading } = exercises;

  const { push } = useRouter();

  if (loading) {
    return (
      <YStack padding="$3" space="$4" alignItems="center">
        <Spinner size="small" color="$green10" />
      </YStack>
    );
  }

  return (
    <YStack>
      <ScrollView>
        <VirtualList
          data={data}
          renderItem={(item) => {
            return <ECard item={item} />;
          }}
          itemHeight={100}
          horizontal={false}
        />
        <VirtualList
          data={data}
          renderItem={(item) => {
            return <ECard item={item} />;
          }}
          itemHeight={100}
          horizontal={false}
        />
      </ScrollView>

      <XStack justifyContent="center" marginTop={'$8'} borderRadius={'$5'}>
        <Button
          size="$5"
          icon={Play}
          themeInverse
          theme={'pink'}
          width={200}
          animation="bouncy"
          pressStyle={{ scale: 0.96, opacity: 0.9 }}
          onPress={() => {
            push(`/workout/${workoutId}/play`);
          }}
        >
          Start
        </Button>
      </XStack>
    </YStack>
  );
}
