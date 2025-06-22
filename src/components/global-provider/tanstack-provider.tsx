import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
    mutations: {
      retry: 2,
    },
  },
});

type Props = {
  children: React.ReactNode;
};

export function TanstackProvider({children}: Readonly<Props>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {import.meta.env.VITE_NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
