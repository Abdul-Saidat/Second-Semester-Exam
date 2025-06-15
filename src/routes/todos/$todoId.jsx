import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import Status from "../../components/CompletionStatus";
// import { useNavigate } from "@tanstack/react-router"
export const Route = createFileRoute("/todos/$todoId")({
  component: TodoDetailPage,
});

// const routeApi = getRouteApi('https://jsonplaceholder/typicode.com/todos/{todoId}')

function TodoDetailPage() {
  const params = useParams({ from: "/todos/$todoId" });
  const fetchTodos = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${params.todoId}`
    );
    if (!response.ok) throw new Error("failed to fetch");
    return response.json();
  };
  const { isPending, error, data } = useQuery({
    queryKey: ["todo", params.todoId],
    queryFn: fetchTodos,
  });

  const location = useLocation();
  const currentPage = location.state?.currentPage || 1;

  const locate = useLocation();
  const checkedTodos = locate.state?.checkedTodos || [];
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

  return (
    <>
      <section className="flex justify-center items-center h-screen ">
        <div className="w-full max-w-lg mx-auto">
          <div className=" border shadow-lg rounded-lg backdrop-blur-lg flex flex-col gap-y-6 items-center">
            <h1 className=" text-xl text-center font-bold ">Todo Detail</h1>
            <span className="font-bold">Title: </span>{" "}
            <span className="">{data.title}</span>
            <Status completionStatus={checkedTodos.includes(data.id)} />
            <p>
              <span className="font-bold"> ID: </span> <span> {data.id} </span>
            </p>
            <Link to="/" state={{ currentPage }}>
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
