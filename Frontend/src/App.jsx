import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContent from "./components/common/AppContent";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
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