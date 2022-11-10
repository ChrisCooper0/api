import { useRef, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../components/Button";
import { setTimeout } from "timers";

const Home: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const emailRef: any = useRef("");
  const passwordRef: any = useRef("");

  const [apiKey, setApiKey] = useState();
  const [responseMssg, setResponseMssg] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const [showApi, setShowApi] = useState(false);

  const toggleVisibility = () => {
    setShowApi(!showApi);
  };

  const resetLoginForm = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setResponseMssg("");
  };

  const handleSignUp = async () => {
    try {
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
      setResponseMssg(data);
      setApiKey(apiKey);
      resetLoginForm();
    } catch (e) {
      setResponseMssg("Error: Please try again");
    }
  };

  const login = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/user", {
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
      setApiKey(apiKey);
      resetLoginForm();
    } catch (e) {
      setResponseMssg("Error: Please try again");
    }
  };

  const handleLogInOut = () => {
    setResponseMssg("");
    if (authState) {
      // Logout
      dispatch(setAuthState(false));
      resetLoginForm();
    } else {
      // Login
      login();
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
    try {
      const res = await fetch("http://localhost:8080/api/resetApiKey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // TODO - update
          "x-api-key": "test",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
        }),
      });
      const { apiKey } = await res.json();

      setApiKey(apiKey);
    } catch (e) {
      setResponseMssg("Failed to reset API Key");
    }
  };

  return (
    <Wrapper>
      <h2>You are logged {authState ? "in" : "out"}</h2>
      {responseMssg && <p>{responseMssg}</p>}
      {apiKey && (
        <>
          <StyledAPIKey>
            <Input type={showApi ? "text" : "password"} value={apiKey} />
            {showApi ? (
              <StyledVisible onClick={toggleVisibility} />
            ) : (
              <StyledInvisible onClick={toggleVisibility} />
            )}
          </StyledAPIKey>
          <Button
            onClick={handleApiKeyCopy}
            text={copySuccess ? "Copied!" : "Copy"}
          ></Button>
        </>
      )}
      <Form>
        <input type="email" ref={emailRef} placeholder={"email"} />
        <input type="password" ref={passwordRef} placeholder={"password"} />
      </Form>
      <ButtonWrapper>
        {!authState && <Button onClick={handleSignUp} text="Sign Up" />}
        <Button
          onClick={handleLogInOut}
          text={authState ? "Log Out" : "Log In"}
        />
      </ButtonWrapper>
      {authState && <Button onClick={resetAPIKey} text="Reset Key" />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const StyledAPIKey = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding-right: 25px;
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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  gap: 0.75rem;
  flex-direction: column;

  input {
    padding: 0.35rem 0.5rem;
    border-radius: 5px;
    border: 0.5px solid lightgrey;
  }
`;

export default Home;
