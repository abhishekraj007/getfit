import { ScrollView, SheetProps, View } from '@t4/ui/src';
import { X } from '@tamagui/lucide-icons';
import {
  Button,
  Dialog,
  Unspaced,
} from 'tamagui';

export interface CustomSheetProps extends SheetProps {
  scrollView?: boolean;
}

export function CustomSheet({
  open = false,
  onOpenChange,
  children,
  scrollView = true,
}: CustomSheetProps) {
  // const [open, setOpen] = useState(false);
  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(open) => {
        onOpenChange && onOpenChange(open);
      }}
    >
      {/* <Dialog.Trigger asChild>
        <Button>Show Dialog</Button>
      </Dialog.Trigger> */}

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
          width={400}
        >
          {/* <Dialog.Title>Edit profile</Dialog.Title> */}

          {scrollView ? <ScrollView>{children}</ScrollView> : <View>{children}</View>}

          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
