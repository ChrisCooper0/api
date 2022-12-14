import React, { useRef, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../components/Button";
import { selectApiKeyState, setApiKeyState } from "../store/apiKeySlice";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const authState = useSelector(selectAuthState);
  const apiKeyState = useSelector(selectApiKeyState);
  const dispatch = useDispatch();

  const emailRef: any = useRef("");
  const passwordRef: any = useRef("");

  const [email, setEmail] = useState<string>("");

  const [apiKey, setApiKey] = useState<string>("");
  const [responseMssg, setResponseMssg] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const [showApi, setShowApi] = useState<boolean>(false);

  const toggleVisibility = () => {
    setShowApi(!showApi);
  };

  const resetLoginForm = () => {
    setResponseMssg("");
    setShowApi(false);
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

      if (res.status === 200) {
        dispatch(setAuthState(emailRef.current.value));
        dispatch(setApiKeyState(apiKey));
        setApiKey(apiKey);
      }
      resetLoginForm();
      setResponseMssg(data);
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

      const { data, apiKey } = await res.json();

      if (res.status === 200) {
        dispatch(setAuthState(emailRef.current.value));
        dispatch(setApiKeyState(apiKey));
        setApiKey(apiKey);
      }
      resetLoginForm();
      setResponseMssg(data);
    } catch (e) {
      setResponseMssg("Error: Please try again");
    }
  };

  const handleLogInOut = () => {
    setResponseMssg("");

    if (!authState) {
      login();
      setEmail(emailRef.current.value);
    } else {
      resetLoginForm();
      setApiKey("");
      dispatch(setApiKeyState(""));
      dispatch(setAuthState(""));
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
          "x-api-key": apiKeyState,
        },
        body: JSON.stringify({
          email,
        }),
      });
      const { apiKey, data } = await res.json();

      setApiKey(apiKey);
      dispatch(setApiKeyState(apiKey));
      setResponseMssg(data);
    } catch (e) {
      setResponseMssg("Failed to reset API Key");
    }
  };

  const deleteUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKeyState,
        },
        body: JSON.stringify({
          email,
        }),
      });

      const { data } = await res.json();

      setResponseMssg(data);

      if (res.status === 200) {
        setResponseMssg(data);
        setApiKey("");
        dispatch(setApiKeyState(""));
        dispatch(setAuthState(""));
      }
    } catch (e) {
      setResponseMssg("Failed to delete account");
    }
  };

  const handleResetPassword = () => {
    router.push("/resetpassword");
  };

  return (
    <Wrapper>
      {responseMssg && <p>{responseMssg}</p>}
      {!authState && (
        <Form>
          <input type="email" ref={emailRef} placeholder={"email"} />
          <input type="password" ref={passwordRef} placeholder={"password"} />
        </Form>
      )}
      <ButtonWrapper>
        {!authState && <Button onClick={handleSignUp} text="Sign Up" />}
        <Button
          onClick={handleLogInOut}
          text={authState ? "Log Out" : "Log In"}
        />
      </ButtonWrapper>
      <ButtonWrapper>
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
            />
          </>
        )}
        {authState && (
          <>
            <Button onClick={resetAPIKey} text="Reset Key" />
            <Button onClick={deleteUser} text="Delete Account" />
            <Button onClick={handleResetPassword} text="Reset Password" />
          </>
        )}
      </ButtonWrapper>
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
  padding: 2px 30px 2px 2px;
  border: 0.5px solid lightgrey;
  border-radius: 5px;
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
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;

  @media screen and (min-width: 678px) {
    flex-direction: row;
  }
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
