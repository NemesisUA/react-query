import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTodo, fetchTodos } from "./api"
import TodoCard from "./components/TodoCard";
import { useState } from "react";


const TodoList = () => {
  const queryClient = useQueryClient();

  const [todoText, setTodoText] = useState("");

  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(),
    queryKey: ["todos"]
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    }
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Todos List</h2>

      <div className="addtodo">
        <input
          type="text"
          placeholder="new todo"
          id="newTodo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />

        <button onClick={() => {
          try {
            if (todoText.trim().length) {
              addTodoMutation({ title: todoText });
              setTodoText("");
            }
          } catch (err) {
            console.error(err)
          }
        }}>Add new</button>
      </div>

      <ul>{
        todos?.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))
      }</ul>
    </div>
  )

}

export default TodoList