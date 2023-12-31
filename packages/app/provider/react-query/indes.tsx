import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export const MyQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
