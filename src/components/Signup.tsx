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
      <div className="flex flex-col">
        <h1>Sign up</h1>
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
          <button type="submit">{loading ? "Signing up" : "Sign up"}</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
