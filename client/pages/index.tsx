import { useRef, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { setTimeout } from "timers";

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

    dispatch(setAuthState(true));
    setSignUpMssg(data);
    setApiKey(apiKey);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const handleLogInOut = () => {
    if (authState) {
      // Logout
      dispatch(setAuthState(false));
    } else {
      // Login
      dispatch(setAuthState(true));
      // TODO: Create login route
    }
  };

  const handleApiKeyCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  };

  const resetAPIKey = async () => {
    const res = await fetch("http://localhost:8080/api/resetApiKey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "test",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
      }),
    });

    const { apiKey } = await res.json();

    setApiKey(apiKey);
  };

  const [showApi, setShowApi] = useState(false);
  const toggleVisibility = () => {
    setShowApi(!showApi);
  };

  return (
    <Wrapper>
      <h2>You are logged {authState ? "in" : "out"}</h2>
      {signUpMssg && <p>{signUpMssg}</p>}
      {!apiKey && (
        <>
          <StyledAPIKey>
            <input type={showApi ? "text" : "password"} value={apiKey} />
            {showApi ? (
              <StyledVisible onClick={toggleVisibility} />
            ) : (
              <StyledInvisible onClick={toggleVisibility} />
            )}
          </StyledAPIKey>
          <button onClick={handleApiKeyCopy}>
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </>
      )}

      <Form>
        <input type="email" ref={emailRef} placeholder={"email"} />
        <input type="password" ref={passwordRef} placeholder={"password"} />
      </Form>
      <Button onClick={handleSignUp}>Sign Up</Button>
      <Button onClick={handleLogInOut}>
        {authState ? "Log Out" : "Log In"}
      </Button>
      {authState && <Button onClick={resetAPIKey}>Reset API Key</Button>}
    </Wrapper>
  );
};

const StyledAPIKey = styled.div`
  position: relative;
`;

const StyledVisible = styled(FiEye)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  :hover {
    cursor: pointer;
  }
`;

const StyledInvisible = styled(FiEyeOff)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  :hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const Form = styled.form`
  display: flex;
  gap: 0.33rem;

  input {
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    border: 1px solid lightgrey;
  }
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
