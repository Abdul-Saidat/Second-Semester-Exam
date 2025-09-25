import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Inputs {
  email: string;
  password: string;
}

function Signin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Signin successful");
      navigate({ to: "/fetch-todos" as any });
      console.log("sign in");
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error("Failed to signin");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <div className="px-4 py-4">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="py-3">
          <div>
            <label htmlFor="email" className="block font-semibold mb-0.5">
              Email:
            </label>
            <input
              className=" border rounded-md w-full max-w-sm mb-3 px-3"
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
            />
            {errors.email && (
              <p className="text-red-600 mt-0">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-0.5 font-semibold">
              Password:
            </label>
            <input
              className="border rounded-md w-full max-w-sm px-3"
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            className="px-5 py-1 mt-8 border rounded-md cursor-pointer bg-slate-600 hover:bg-slate-700 text-white"
            type="submit"
          >
            {loading ? "Signing in" : "Sign in"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Signin;