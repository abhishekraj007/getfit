import { CustomToast, ToastProvider } from '@t4/ui';
import { ToastViewport } from './toast-viewport';
// import { TRPCProvider } from './trpc'
import { SafeAreaProvider } from './safe-area';
import { TamaguiThemeProvider } from './theme';
import { SolitoImageProvider } from './solito-image';
import { MyQueryClientProvider } from './react-query';
import { LanguageProvider } from './language';
import { PlayerProvider } from './player/PlayerProvider';
// import { Session } from '@supabase/supabase-js'
// import { AuthProvider } from './auth'

export function Provider({
  children, // initialSession,
}: {
  children: React.ReactNode;
  // initialSession: Session | null
}) {
  return (
    <MyQueryClientProvider>
      <TamaguiThemeProvider>
        <PlayerProvider>
          <SafeAreaProvider>
            <LanguageProvider>
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
            </LanguageProvider>
          </SafeAreaProvider>
        </PlayerProvider>
      </TamaguiThemeProvider>
    </MyQueryClientProvider>
  );
}
