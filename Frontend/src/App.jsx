import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContent from "./components/ui/AppContent";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false
        }
    }
})

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent />
        </QueryClientProvider>
    )
}