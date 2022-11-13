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
  color: #d3d3d3;
  background: #1cb5e0;

  &:hover {
    cursor: pointer;
    transition: 0.3s ease all;
    background: #2ba9cd;
  }
`;

export default Button;
