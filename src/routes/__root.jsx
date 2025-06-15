import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import ErrorBoundary from "../components/ErrorBoundary";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorBoundary,
  notFoundComponent: () => {
    return (
      <>
        <section className="flex justify-center items-center h-screen">
          <div className="w-full max-w-lg mx-auto">
            <div className=" border shadow-lg rounded-lg backdrop-blur-lg flex flex-col gap-y-6 items-center">
              <h1 className="text-center">
                {" "}
                OOOPPPS, SORRY, THE PAGE YOU ARE LOOKING FOR DOESN'T SEEM TO
                EXIST
              </h1>
              <Link to="/">
                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl px-6 py-3 text-lg rounded-md shadow-md mt-4">
                  Back To List
                </button>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  },
});

function RootComponent() {
  return (
    <>
      <header className="p-2 flex items-center justify-center gap-20 text-lg border-b">
        <nav>
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
            to="/test-error"
            activeProps={{
              className: "font-bold",
            }}
          >
            Test-Error
          </Link>
        </nav>
      </header>
      <hr />
      <main className="py-2 px-4">
        <Outlet />
      </main>
      <footer className="p-2">
        <TanStackRouterDevtools position="bottom-right" />
      </footer>
    </>
  );
}
