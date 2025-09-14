import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
// import Status from "../../components/CompletionStatus";
import type { LocationState } from "../../types";
// import { getCreatedTodos } from "../../utils/storage";
// import { useNavigate } from "@tanstack/react-router"
export const Route = createFileRoute("/todos/$todoId")({
  component: TodoDetailPage,
});

interface StatusProps {
  completionStatus: boolean;
}

function Status({ completionStatus }: StatusProps) {
  return (
    <p className={completionStatus ? "text-green-600" : "text-red-600"}>
      {completionStatus ? "Completed" : "Uncompleted"}
    </p>
  );
}

function isLocationState(s: unknown): s is LocationState {
  if (!s || typeof s !== "object") return false;
  const o = s as Record<string, unknown>;
  const okCurrentPage =
    o.currentPage === undefined || typeof o.currentPage === "number";
  const okCheckedTodos =
    o.checkedTodos === undefined || Array.isArray(o.checkedTodos);
  return okCurrentPage && okCheckedTodos;
}

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId?: number,
}
// const routeApi = getRouteApi('https://jsonplaceholder/typicode.com/todos/{todoId}')
function TodoDetailPage() {
  const { id } = Route.useParams();
  // const localTodoId = Number(id);

  const params = useParams({ from: "/todos/$todoId" });
  const todoId = params.todoId;

  const location = useLocation();

  const createdTodos = JSON.parse(localStorage.getItem("createdTodos") || "[]");
  const localTodos = createdTodos.find((t: any) => String(t.id) === id);

  const fetchTodos = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );
    if (!response.ok) throw new Error("failed to fetch");
    return response.json() as Promise<Todo>;
  };
  const {
    isPending,
    error,
    data: apiTodo,
  } = useQuery<Todo, Error>({
    queryKey: ["todo", todoId],
    queryFn: fetchTodos,
    enabled: !localTodos,
  });

  const todo = apiTodo || localTodos;

  if (isPending)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  const rawState = location.state;
  const state = isLocationState(rawState) ? (rawState as LocationState) : null;
  const currentPage = state?.currentPage ?? 1;
  const checkedTodos = state?.checkedTodos ?? [];

  const linkStateRaw = { currentPage, checkedTodos };
  const linkState = isLocationState(linkStateRaw)
    ? (linkStateRaw as LocationState)
    : undefined;

  const isChecked = todo ? checkedTodos.includes(todo.id) : false;

  return (
    <>
      <section className="flex justify-center items-center h-screen ">
        <div className="w-full max-w-lg mx-auto">
          <div className=" border shadow-lg rounded-lg backdrop-blur-lg flex flex-col gap-y-6 items-center">
            <h1 className=" text-xl text-center font-bold ">Todo Detail</h1>
            <span className="font-bold">Title: </span>{" "}
            <span className="">{todo.title}</span>
            <Status completionStatus={isChecked} />
            <p>
              <span className="font-bold"> ID: </span> <span> {todo.id} </span>
            </p>
            <Link to="/" state={linkState as any}>
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
                Back To List
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default TodoDetailPage;
