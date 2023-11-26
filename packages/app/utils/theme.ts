export const ThemeVariant = {
  light: 'light',
  dark: 'dark'
} as const

export type ThemeVariant = keyof typeof ThemeVariant
