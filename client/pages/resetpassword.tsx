import React, { useEffect, useRef, useState } from "react";
import { selectAuthState } from "../store/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../components/Button";

const resetpassword = () => {
  const router = useRouter();
  const authState = useSelector(selectAuthState);

  // TODO: Move to middleware?
  useEffect(() => {
    if (!authState) {
      router.push("/");
    }
  }, [authState]);

  const passwordRef: any = useRef();

  const [responseMssg, setResponseMssg] = useState<string>("");

  const resetForm = () => {
    passwordRef.current.value = "";
    setResponseMssg("");
  };

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authState,
          password: passwordRef.current.value,
        }),
      });

      const { data } = await res.json();

      if (res.status === 200) {
        resetForm();
      }
      setResponseMssg(data);
    } catch (e) {
      setResponseMssg("Error: Please try again");
    }
  };

  return (
    <Wrapper>
      {responseMssg && <p>{responseMssg}</p>}
      <Form>
        <label htmlFor="password">Type your new password</label>
        <input type="password" ref={passwordRef} required />
      </Form>
      <Button onClick={handleClick} text="Confirm" />
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

export default resetpassword;
