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
      <button type="submit" onClick={onSubmit}>
        {isSigningOut ? "Signing Out" : "Sign Out"}
      </button>
    </>
  );
}

export default SignOut;
