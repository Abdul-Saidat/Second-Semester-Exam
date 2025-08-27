import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import SearchInput from "../components/SearchInput";
import Filter from "../components/Filter";
import FilterButtons from "../components/FilterButtons";
import HandleDelete from "../components/DeleteTodo";
import type { LocationState } from "../types";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

interface Todo {
  id: number;
  todo: string;
  title: string;
  completed: boolean;
}

const fetchTodos = async (page: number): Promise<Todo[]> => {
  const PER_PAGE = 10;
  const _start = (page - 1) * PER_PAGE;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_start=${_start}&_limit=${PER_PAGE}`
  );
  if (!response.ok) throw new Error("failed to fetch");
  return response.json() as Promise<Todo[]>;
};

function isLocationState(s: unknown): s is LocationState {
  if (!s || typeof s !== "object") return false;
  const o = s as Record<string, unknown>;
  return (
    (o.currentPage === undefined || typeof o.currentPage === "number") &&
    (o.checkedTodos === undefined || Array.isArray(o.checkedTodos))
  );
}

function RouteComponent() {
  type CompletionStatus = "all" | "completed" | "uncompleted";
  const Page = 200;
  const location = useLocation();
  // const incomingPage = location.state?.currentPage;
  const incomingPage = isLocationState(location.state)
    ? location.state.currentPage
    : undefined;
  const [page, setPage] = useState<number>(incomingPage ?? 1);
  const [completionStatus, setCompletionStatus] =
    useState<CompletionStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { isPending, error, data, isFetching } = useQuery<Todo[], Error>({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page),
    placeholderData: keepPreviousData,
  });

  // store checked todos in localStorage
  const [checkedTodos, setCheckedTodos] = useState<number[]>(() => {
    const localStorageKey = "checkedTodoIds";
    const storedTodoString = localStorage.getItem(localStorageKey);
    if (storedTodoString) {
      try {
        return JSON.parse(storedTodoString);
      } catch (warning) {
        console.warn("couldn't parse checked todos from localStorage", warning);
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // filter by title
  const searchResult = (data ?? []).filter((todo: Todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // filter todo by "completed" and "uncompleted"
  let finalDisplayTodos: Todo[] = [];
  if (completionStatus == "all") {
    finalDisplayTodos = searchResult;
  } else if (completionStatus == "completed") {
    finalDisplayTodos = searchResult.filter((todo: Todo) =>
      checkedTodos.some((id: number) => todo.id === id)
    );
  } else {
    finalDisplayTodos = searchResult.filter(
      (todo: Todo) => !checkedTodos.some((id: number) => todo.id === id)
    );
  }

  const linkState = { checkedTodos, currentPage: page } as any;

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
            <div className=" flex flex-col gap-6 w-full items-center ">
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <div className="w-full max-w-sm mx-auto px-4 space-y-6  cursor-pointer ">
                {finalDisplayTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className=" flex items-center justify-between gap-4 border h-auto  px-5 py-4 rounded-lg shadow "
                  >
                    <ul>
                      <label htmlFor="todo-check">
                        <input
                          className="w-5 h-5 cursor-pointer"
                          type="checkbox"
                          name="checkbox"
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
                          state={linkState}
                        >
                          {" "}
                          {todo.title}{" "}
                        </Link>
                      </label>
                    </ul>
                    <HandleDelete todo={todo} page={page} />
                  </div>
                ))}
              </div>
            </div>
            <div>{isFetching ? "Updating..." : ""}</div>
            <FilterButtons page={page} setPage={setPage} />
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
