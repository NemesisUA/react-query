import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import TodoList from "./TodoList";
import '../src/App.css'

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} >
      <TodoList />
    </QueryClientProvider>
  )
}

export default App