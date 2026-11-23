import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router/Router";

export default function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    )
}