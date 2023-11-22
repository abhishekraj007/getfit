import { AlertDialog, Button, XStack, YStack } from '@t4/ui/src';

interface ExitModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExitModal({ open = false, onConfirm, onCancel }: ExitModalProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <AlertDialog.Content
          bordered
          elevate
          key="content"
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
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>Exit</AlertDialog.Title>

            <AlertDialog.Description>Are you sure you want to Quit?</AlertDialog.Description>
            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Action asChild>
                <Button onPress={onConfirm} chromeless>
                  Quit
                </Button>
              </AlertDialog.Action>
              <AlertDialog.Cancel asChild>
                <Button onPress={onCancel} themeInverse>
                  Continue
                </Button>
              </AlertDialog.Cancel>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
