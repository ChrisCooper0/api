import React, { useEffect } from "react";
import { selectAuthState } from "../store/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const resetpassword = () => {
  const router = useRouter();
  const authState = useSelector(selectAuthState);

  // TODO: Move to middleware?
  useEffect(() => {
    if (!authState) {
      router.push("/");
    }
  }, [authState]);

  // form to input new password, hash and send to new api router with email (get behind the scenes as already logged in)
  // update db with new password hash, return success or error

  return <div>resetpassword</div>;
};

export default resetpassword;
