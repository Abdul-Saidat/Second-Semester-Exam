import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

function CreateTodo() {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [userId, setUserId] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  type Todos = {
    title: string;
    completed: boolean;
    userId: number;
  };

  type todos = Todos[];

  const addNewTodo = async (newTodo: Todos) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      newTodo
    );
    return response.data;
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNewTodo,
    onSuccess: (data) => {
      queryClient.setQueryData(["todos"], (oldTodos: todos) => {
        return oldTodos ? [data, ...oldTodos] : [data];
      });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsOpen(false);
      // document.getElementById("my_modal_3").close();
    },
  });

  const handleSubmit = () => {
    if (!newTodoTitle.trim()) return;
    mutation.mutate({ title: newTodoTitle, completed: false, userId });
    setNewTodoTitle("");
  };

  return (
    <>
      <button className="btn " onClick={() => setIsOpen(true)}>
        Create Todo
      </button>
      {isOpen && (
        <dialog id="my_modal_2" className="modal" open>
          <div className="modal-box">
            <div className="flex flex-col items-center justify-around ">
              <h1>Create New Todo</h1>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-xl">Title</legend>
                <input
                  type="text"
                  className="input rounded-2xl"
                  placeholder="Enter Title"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                />
              </fieldset>

              <legend className="text-xl">ID</legend>
              <input
                type="number"
                className="input validator"
                placeholder="Type a number between 1 to 10"
                min="1"
                max="10"
                title="Must be between be 1 to 10"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
              />
              <p className="validator-hint">Must be between be 1 to 10</p>
              <button
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
                onClick={handleSubmit}
              >
                Add Todo
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}

export default CreateTodo;
