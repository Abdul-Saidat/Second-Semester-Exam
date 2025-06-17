import { useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

function HandleDelete({ todo, page }) {
  const queryClient = useQueryClient();
  const handleDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos${id}`, {
      method: "DELETE",
    });
    queryClient.setQueryData(["todos", page], (oldTodo) => {
      if (!oldTodo) return [];

      return oldTodo.filter((todo) => todo.id != id);
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
