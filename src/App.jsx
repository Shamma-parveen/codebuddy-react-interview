import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";
import { SnackbarProvider } from "notistack";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider anchorOrigin={{ horizontal: "right", vertical: "top" }} />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
