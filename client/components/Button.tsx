import React from "react";
import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 0.3rem 0.5rem;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease all;
  background-color: whitesmoke;
  color: #121212;
  &:hover {
    background-color: lightgrey;
    cursor: pointer;
    transition: 0.3s ease all;
  }
`;

export default Button;
