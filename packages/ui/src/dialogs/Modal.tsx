import { Button, Dialog, DialogProps, H5, Unspaced } from 'tamagui';

import { X } from '@tamagui/lucide-icons';

export interface CustomModalProps extends DialogProps {
  title?: string;
}

export const CustomModal = ({ title, children, open, onOpenChange }: CustomModalProps) => (
  <Dialog modal open={open} onOpenChange={onOpenChange}>
    <Dialog.Trigger />
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
      >
        <Unspaced>
          <Dialog.Close asChild>
            <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
          </Dialog.Close>
        </Unspaced>
        {title && (
          <Dialog.Title>
            <H5>{title}</H5>
          </Dialog.Title>
        )}
        <Dialog.Description> {children} </Dialog.Description>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog>
);
