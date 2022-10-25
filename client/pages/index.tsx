import { MutableRefObject, useRef, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Home: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const emailRef: any = useRef("");
  const passwordRef: any = useRef("");

  const [apiKey, setApiKey] = useState();
  const [signUpMssg, setSignUpMssg] = useState();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSignUp = async () => {
    const res = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });

    const { apiKey, data } = await res.json();

    setSignUpMssg(data);
    setApiKey(apiKey);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const handleLogInOut = () => {
    // create new login/logout route (check against db) & global state
    if (authState) {
      // log out
      dispatch(setAuthState(false));
    }
    if (!authState) {
      // log in
      dispatch(setAuthState(true));
    }
  };

  const handleApiKeyCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopySuccess(true);
    }
  };

  return (
    <Wrapper>
      <input type="email" ref={emailRef} />
      <input type="password" ref={passwordRef} />
      {signUpMssg && <p>{signUpMssg}</p>}
      {apiKey && (
        <button onClick={handleApiKeyCopy}>
          {copySuccess ? "Copied!" : "Copy"}
        </button>
      )}
      <Button onClick={handleSignUp}>Sign Up</Button>
      <Button onClick={handleLogInOut}>
        {authState ? "Log Out" : "Log In"}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.3rem 0.5rem;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease all;

  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
    transition: 0.3s ease all;
  }
`;

export default Home;
