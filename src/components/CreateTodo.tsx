import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getCreatedTodos, saveCreatedTodos } from "../../src/utils/storage";

function CreateTodo() {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [userId, setUserId] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  type Todo = {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  };
  // type Todos = Todo[];

  const addNewTodo = async (newTodo: Todo): Promise<Todo> => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      newTodo
    );
    return response.data;
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNewTodo,
    onSuccess: (data: Todo) => {
      const newTodo = {
        id: Date.now(),
        title: data.title || newTodoTitle,
        completed: false,
        userId: data.userId || userId,
      };
      const createdTodos = getCreatedTodos();
      const updatedCreatedTodos = [newTodo, ...createdTodos];
      saveCreatedTodos(updatedCreatedTodos);

      // const PER_PAGE = 10;

      // queryClient.setQueryData<Todo[]>(["todos", 1], (old = []) =>
      //   [newTodo, ...old].slice(0, PER_PAGE)
      // );

      queryClient.invalidateQueries({queryKey: ["todos"]})
      setIsOpen(false);
    },
  });

  const handleSubmit = () => {
    if (!newTodoTitle.trim()) return;
    mutation.mutate({
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
      userId,
    });
    setIsOpen(false);
    setNewTodoTitle("");
  };

  return (
    <>
      <button className="border cursor-pointer rounded-md px-5 py-2 btn bg-slate-600 hover:bg-slate-700 text-slate-50" onClick={() => setIsOpen(true)}>
        Create Todo
      </button>
      {isOpen && (
        // <dialog id="my_modal_2" className="modal" open>
        //     </dialog>
         <div className=" z-50 inset-0 bg-[var(--overlay)] fixed flex items-center justify-center">
            <div className="bg-white rounded-lg">
            <button
                className="text-4xl text-slate-700 cursor-pointer ml-5"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
             <div className="">
                <div className="w-[300px] md:w-[450px] text-xl text-slate-500 px-4 py-5 ">
                  <h1 className="text-center font-semibold">Create New Todo</h1>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-[17px] mt-4 mb-1">Title</legend>
                <input
                  type="text"
                  className="input rounded-md border w-full max-w-sm mb-4 px-3 text-[16px]"
                  placeholder="Enter Title"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                />
              </fieldset>

              <legend className="text-[17px] mb-1">ID</legend>
              <input
                type="number"
                className="input validator border rounded-md w-full max-w-sm px-3"
                placeholder="Type a number between 1 to 10"
                min="1"
                max="10"
                title="Must be between be 1 to 10"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
              />
              <p className="validator-hint text-[16px]">Must be between be 1 to 10</p>
              <button
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl  mt-5 text-[16px] cursor-pointer border rounded-md px-3 py-1 bg-slate-600 hover:bg-slate-700 text-slate-50"
                onClick={handleSubmit}
              >
                Add Todo
              </button>
            </div>
          </div>
           </div>
             </div>
          
          
        )}
        {/* <button onClick={() => setIsOpen(false)}>close</button> */}
      {/* <form method="dialog" className="modal-backdrop">
      </form> */}
    </>
  );
}

export default CreateTodo;
