import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import AuthModal from "../components/AuthModal";
import Signup from "../components/Signup";
import Signin from "../components/Signin";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const [authMode, setAuthMode] = useState<"signin" | "signup" | null>(null);
  return (
    <>
      <section className="my-15 mx-4 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl text-center"> TODO APP</h1>
        <div className="py-5">
          <p className="text-[18px]">
            This is a simple Todo app built with Next.js, React, TypeScript,
            TailwindCSS and Firebase authentication.
          </p>
          <div className="my-5">
            <span className="font-semibold text-xl">Features:</span>
            <ul>
              <li>
                <span role="img" aria-label="check">
                  ✅
                </span>
                Authentication
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✅
                </span>
                View all Todos
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✅
                </span>
                View each Todo&apos;s detail
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✅
                </span>
                Create new Todos
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✅
                </span>
                Delete Todos
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✅
                </span>
                Filter Todos based on status (completed or uncompleted)
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✅
                </span>
                Real time pagination
              </li>
            </ul>
          </div>

          <h1 className="text-xl md:text-2xl text-center md:text-left">
            Are you ready to smash your daily goals?
          </h1>
          <h2>
            Click the buttons below to signup if you don&apos;t have an account
            yet or sign in if you do.
          </h2>
          <div className="flex gap-5 mt-3">
            <button
              className="px-5 py-1 border rounded-full cursor-pointer bg-slate-700 hover:bg-slate-800 text-white"
              onClick={() => setAuthMode("signup")}
            >
             Sign Up
            </button>
            <button
              className="px-5 py-1 border rounded-full cursor-pointer bg-slate-600 hover:bg-slate-700 text-white"
              onClick={() => setAuthMode("signin")}
            >
              Sign In
            </button>
          </div>
          {authMode && (
            <AuthModal onClose={() => setAuthMode(null)}>
              {authMode === "signup" ? <Signup /> : <Signin />}
            </AuthModal>
          )}
        </div>
      </section>
    </>
  );
}

export default LandingPage;

