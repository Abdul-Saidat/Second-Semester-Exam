import { useNavigate } from "@tanstack/react-router";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";

function SignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const onSubmit = async () => {
    try {
      await signOut(auth);
      setIsSigningOut(true);
      navigate({ to: "/" as any });
    } catch (error) {
      console.log("error navigating");
    }
  };
  return (
    <>
      <button
        className="px-20 py-2 md:w-xl text-white bg-red-500 hover:bg-red-700 cursor-pointer rounded-full"
        type="submit"
        onClick={onSubmit}
      >
        {isSigningOut ? "Signing Out" : "Sign Out"}
      </button>
    </>
  );
}

export default SignOut;
