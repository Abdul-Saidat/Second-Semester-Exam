import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { queryClient } from "../queryClient";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <h1>404 PAGE NOT FOUND</h1>
        <Link to="/">Start Over</Link>
      </div>
    )

  }
});

function RootComponent() {
  return (
    <>
          <header className="p-2 flex gap-2 text-lg border-b">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Todos
        </Link>
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>
         <Link
          to="/errr"
          activeProps={{
            className: "font-bold",
          }}
        >
          Error
        </Link>
      </header>
      <hr />
      <main className="py-2 px-4">
      <Outlet />
      </main>
      <footer className="p-2">
      <TanStackRouterDevtools position="bottom-right"/>
      </footer>
    </>
  )
}