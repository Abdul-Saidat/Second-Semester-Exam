import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

function ErrorBoundary({ error }) {
  const navigate = useNavigate();
  return (
    <>
      <section className="flex justify-center items-center h-screen ">
        <div className="w-full max-w-lg mx-auto">
          <div className=" border shadow-lg rounded-lg backdrop-blur-lg flex flex-col gap-y-6 items-center">
            <p className="text-xl text-center">
              {(error.message = "Couldn't Find Page")}
            </p>
            <Link to="/">
              <button
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl px-6 py-3 text-lg rounded-md shadow-md mt-4 "
                onClick={() => navigate({ to: "/" })}
              >
                Back To List
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ErrorBoundary;
