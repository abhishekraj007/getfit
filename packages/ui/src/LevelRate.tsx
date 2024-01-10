import { Activity } from '@tamagui/lucide-icons';

// WiLightning

export default function LevelRate({ rate, iconSize }: { rate: number; iconSize?: number }) {
  const Color = 'yellow';
  const NoColor = 'rgba(255,255,255,0.5)';
  const Size = iconSize ? iconSize : 18;

  if (rate === 1) {
    return (
      <>
        <Activity color={Color} size={Size}></Activity>
        <Activity color={NoColor} size={Size}></Activity>
        <Activity color={NoColor} size={Size}></Activity>
      </>
    );
  } else if (rate === 2) {
    return (
      <>
        <Activity color={Color} size={Size}></Activity>
        <Activity color={Color} size={Size}></Activity>
        <Activity color={NoColor} size={Size}></Activity>
      </>
    );
  } else if (rate >= 3) {
    return (
      <>
        <Activity color={Color} size={Size}></Activity>
        <Activity color={Color} size={Size}></Activity>
        <Activity color={Color} size={Size}></Activity>
      </>
    );
  }

  return null;
}
