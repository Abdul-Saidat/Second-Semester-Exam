import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import Filter from "../components/Filter";
import { useLocation } from "@tanstack/react-router";


export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const fetchTodos = async (page) => {
  const PER_PAGE = 10;
  const _start = (page - 1) * PER_PAGE;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_start=${_start}&_limit=${PER_PAGE}`
  );
  if (!response.ok) throw new Error("failed to fetch");
  return response.json();
};

function RouteComponent() {
   const Page = 200;
  const location = useLocation();
  const incomingPage = location.state?.currentPage;
  const [completionStatus, setCompletionStatus] = useState("all");
  const [page, setPage] = useState(incomingPage || 1);
  const [searchTerm, setSearchTerm] = useState("");
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page),
    keepPreviousData: true,
  });
  const [checkedTodos, setCheckedTodos] = useState(() => {
    const localStorageKey = "checkedTodoIds";
    const storedTodoString = localStorage.getItem(localStorageKey);
    if (storedTodoString) {
      try {
        return JSON.parse(storedTodoString);
      } catch (warning) {
        console.warning(
          "couldn't parse checked todos from localStorage",
          warning
        );
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("checkedTodoIds", JSON.stringify(checkedTodos));
  }, [checkedTodos]);


  if (isPending)
    return (
      <div className="flex w-52 flex-col gap-4 items-center justify-center ">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  if (error) return "An error has occurred: " + error.message;
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const searchResult = data.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let finalDisplayTodos;
  if (completionStatus == "all") {
    finalDisplayTodos = searchResult;
  } else if (completionStatus == "completed") {
    finalDisplayTodos = searchResult.filter((todo) =>
      checkedTodos.some((id) => todo.id === id)
    );
  } else {
    finalDisplayTodos = searchResult.filter(
      (todo) => !checkedTodos.some((id) => todo.id === id)
    );
  }

  return (
    <>
      <h1 className="flex items-center justify-center font-bold">TODO-LIST</h1>
      <section className="flex items-center justify-center  min-h-screen">
        <div className=" w-150 h-full shadow-lg   p-4 rounded-lg border border-white/20 backdrop-blur-sm ">
          <div className=" -50 flex items-center justify-center ">
            <form action="" onSubmit={handleSubmit} name="todo-form">
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>

              {finalDisplayTodos.map((todo) => (
                <div key={todo.id}>
                  <ul>
                    <input
                      type="checkbox"
                      name="todo-check"
                      id="todo-check"
                      checked={checkedTodos.includes(todo.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckedTodos([...checkedTodos, todo.id]);
                        } else {
                          setCheckedTodos(
                            checkedTodos.filter((id) => id !== todo.id)
                          );
                        }
                      }}
                    />{" "}
                    <Link
                      to={`/todos/${todo.id}`}
                      state={{ currentPage: page }}
                    >
                      {" "}
                      {todo.title}{" "}
                    </Link>
                  </ul>
                </div>
              ))}
              <div>{isFetching ? "Updating..." : ""}</div>
              <section className="join grid grid-cols-2">
                <button
                  className="join-item btn btn-outline"
                  onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                >
                  Previous page
                </button>
                <p>
                  Page {page} of {Page}{" "}
                </p>
                <button
                  className="join-item btn btn-outline"
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </section>
              <Filter
                completionStatus={completionStatus}
                setCompletionStatus={setCompletionStatus}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

// when i click back to list on the details page, it should take me back to the exact page i left from
//  {data.map((todo) => (
//               <div key={todo.id}>
//                <Link to={`/todos/${todo.id}`} state={{ currentPage: page}} > {todo.title} </Link>
//               </div>
//             ))}
