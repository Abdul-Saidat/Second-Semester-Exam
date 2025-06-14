import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useLocation} from '@tanstack/react-router';
// import { useNavigate } from "@tanstack/react-router"
export const Route = createFileRoute("/todos/$todoId")({
  component: TodoDetailPage,
})

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

  const location = useLocation()
  const currentPage = location.state?.currentPage || 1

  if (isPending)
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;
  
  return (
    <>
       <div className="w-1xl h-full border-b-purple-500 rounded border-amber-500" >
        <p> {data.title} </p>
        <p> ID: {data.id} </p>
        <Link to="/" state={{currentPage}} >
        <button className=" bg-sky-400 text-white rounded hover:bg-sky-300  btn btn-dash btn-secondary">Back To List</button>
        </Link>
      </div>
    </>
  );
}

{/* <p> Completed: {data.completed ? "✅" : "❌"} </p> */}
{/* <Link to="/">
<button className=" bg-sky-400 text-white rounded hover:bg-sky-300  btn btn-dash btn-secondary">Back To List</button>
</Link> */}
{/* <button onClick={() => navigate(`/list?page=${currentPage}`)}>Back to List</button> */}
{/* <Link to="/" state={{currentPage}} > */}