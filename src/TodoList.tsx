import { useQuery } from "@tanstack/react-query"
import { fetchTodos } from "./api"
import { Todo } from "./entities/Todo"
import { useState } from "react";

interface TodoProps {
  todo: Todo;
}

function TodoCard({ todo }: TodoProps) {
  const [checked, setChecked] = useState(todo.completed);

  return (
    <div>
      {todo.title}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    </div>
  );
}

const TodoList = () => {
  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(),
    queryKey: ["todos"]
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Todos List</h2>
      <ul>{
        todos?.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))
      }</ul>
    </div>
  )

}

export default TodoList