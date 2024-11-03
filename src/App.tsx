import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import TodoList from "./TodoList";


const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} >
      <TodoList />
    </QueryClientProvider>
  )
}

export default App