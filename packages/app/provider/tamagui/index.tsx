import config from '../../tamagui.config'
import { TamaguiProvider as TamaguiProviderOG } from '@t4/ui'
import { useAppTheme } from 'app/atoms/theme'

export const TamaguiProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const [currentTheme] = useAppTheme()

  console.log({ currentTheme })

  return (
    <TamaguiProviderOG
      config={config}
      disableInjectCSS
      disableRootThemeClass
      defaultTheme={currentTheme}
    >
      {children}
    </TamaguiProviderOG>
  )
}
