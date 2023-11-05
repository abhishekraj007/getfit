import { CustomToast, ToastProvider } from '@t4/ui'
import { ToastViewport } from './toast-viewport'
// import { TRPCProvider } from './trpc'
import { SafeAreaProvider } from './safe-area'
import { TamaguiThemeProvider } from './theme'
import { SolitoImageProvider } from './solito-image'
// import { Session } from '@supabase/supabase-js'
// import { AuthProvider } from './auth'

export function Provider({
  children, // initialSession,
}: {
  children: React.ReactNode
  // initialSession: Session | null
}) {
  return (
    <TamaguiThemeProvider>
      <SafeAreaProvider>
        <SolitoImageProvider>
          <ToastProvider swipeDirection="horizontal" duration={6000} native={['mobile']}>
            {children}
            {/* <AuthProvider initialSession={initialSession}> */}
            {/* <TRPCProvider>{children}</TRPCProvider> */}
            <CustomToast />
            <ToastViewport />
            {/* </AuthProvider> */}
          </ToastProvider>
        </SolitoImageProvider>
      </SafeAreaProvider>
    </TamaguiThemeProvider>
  )
}
