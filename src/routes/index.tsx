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
      <div className="bg-slate-500 text-slate-950">
        <h1>
          Hi There, are you ready to manage your daily tasks? I know that's a
          YES!!!
        </h1>
        <h2>
          Click the button bellow to signup if you don't have an account yet or
          sign in if you do
        </h2>
        <button onClick={() => setAuthMode("signup")}>Sign Up</button>
        <button onClick={() => setAuthMode("signin")}>Sign In</button>
        {authMode && (
          <AuthModal onClose={() => setAuthMode(null)}>
            {authMode === "signup" ? <Signup /> : <Signin />}
          </AuthModal>
        )}
      </div>
    </>
  );
}

export default LandingPage;

