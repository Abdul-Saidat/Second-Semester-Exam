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
      <div className="flex flex-col">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block">
              Email:
            </label>
            <input
              className="w-xl"
              {...register("email", { required: "Email is required" })}
              type="email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password:
            </label>
            <input
              className="w-xl"
              {...register("password", { required: "Password is required" })}
              type="password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type="submit">{loading ? "Signing in" : "Sign in"}</button>
        </form>
      </div>
    </>
  );
}

export default Signin;
