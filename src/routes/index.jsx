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

  // store checked todos in localStorage
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

  // save updated checkedTodos state to localStorage
  useEffect(() => {
    localStorage.setItem("checkedTodoIds", JSON.stringify(checkedTodos));
  }, [checkedTodos]);
  if (isPending)
    return (
      <div className="flex items-center justify-center  min-h-screen">
        <div className="flex w-82 flex-col gap-4 items-center">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  if (error) return "An error has occurred: " + error.message;
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // filter by title
  const searchResult = data.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // filter todo by "completed" and "uncompleted"
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
      <section className=" flex justify-center py-10 pt-20 ">
        <div className=" flex flex-col gap-y-8 w-full max-w-2xl min-h-[80vh] shadow-lg p-10 rounded-lg backdrop-blur-lg  ">
          <h1 className="text-center">TODO-LIST</h1>
          <form
            action=""
            onSubmit={handleSubmit}
            name="todo-form"
            className="w-full flex flex-col gap-y-8"
          >
            <div className=" flex flex-col w-full items-center ">
              <label className=" w-full input flex items-center gap-1 rounded-lg py-4 md:max-w-md mx-auto">
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
                  className="text-white focus:outline-none rounded-lg"
                />
              </label>

              <div className="w-full max-w-sm mx-auto px-4 space-y-6 cursor-pointer ">
                {finalDisplayTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className=" flex items-center gap-4 border h-auto  px-5 py-4 rounded-lg shadow "
                  >
                    <ul>
                      <input
                        className="w-5 h-5 cursor-pointer"
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
                        className={"font-semibold text-lg"}
                        to={`/todos/${todo.id}`}
                        state={{ checkedTodos, currentPage: page }}
                      >
                        {" "}
                        {todo.title}{" "}
                      </Link>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>{isFetching ? "Updating..." : ""}</div>
            <section className="join grid grid-cols-3 mb-8">
              <button
                className="join-item btn btn-outline border-4 focus:outline-4 rounded-lg shadow-md"
                onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                disabled={page === 1}
              >
                Previous page
              </button>
              <span className="col-span-1 text-lg font-bold text-center self-center">
                Page {page} of {Page}{" "}
              </span>
              <button
                className="join-item btn btn-outline rounded-4xl shadow-md "
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next Page
              </button>
            </section>
            <Filter
              completionStatus={completionStatus}
              setCompletionStatus={setCompletionStatus}
            />
          </form>
        </div>
      </section>
    </>
  );
}

