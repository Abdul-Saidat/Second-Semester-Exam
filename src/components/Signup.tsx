import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Inputs {
  email: string;
  password: string;
}

function Signup() {
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
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Signup successful");
      navigate({ to: "/" as any });
    } catch (error: any) {
      console.error("Signup failed", error);
      toast.error("Failed to signup");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="px-4 py-4">
        <h1 className="text-xl font-semibold">Sign up</h1>
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
            className="px-5 py-1 mt-8 border rounded-md cursor-pointer bg-slate-700 hover:bg-slate-800 text-white"
            type="submit"
          >
            {loading ? "Signing up" : "Sign up"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
