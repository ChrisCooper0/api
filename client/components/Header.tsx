import React from "react";
import styled from "styled-components";
import Link from "next/link";

type HeaderProps = {
  text: string;
};

const Header = ({ text }: HeaderProps) => {
  return (
    <Link href="/" passHref>
      <Heading>{text}</Heading>
    </Link>
  );
};

const Heading = styled.h1`
  font-size: 3rem;
  /* font-family: "Monoton", cursive; */
  /* color: #21c6e3; */
  &:hover {
    cursor: pointer;
  }
`;

export default Header;
