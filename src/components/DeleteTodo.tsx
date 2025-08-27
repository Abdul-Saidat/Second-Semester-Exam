import { useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

interface TodoItem  {
    todo: string,
    completed: boolean,
    id: number,
  } 

  interface HandleDeleteProps  {
    todo: TodoItem,
    page: number,
  } 
function HandleDelete({ todo, page }: HandleDeleteProps) {
  const queryClient = useQueryClient();
  const handleDelete = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos${id}`, {
      method: "DELETE",
    });
    queryClient.setQueryData(["todos", page], (oldTodo: TodoItem[]) => {
      if (!oldTodo) return [];

      return oldTodo.filter((t) => t.id != id);
    });
  };

  return (
    // hover:text-red-500 bg-[#003944]
    <>
      <i
        className=" transition-colors  hover:text-cyan-900"
        onClick={() => handleDelete(todo.id)}
      >
        <FaTrash />
      </i>
    </>
  );
}

export default HandleDelete;
