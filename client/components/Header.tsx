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
  margin-left: 20px;
  font-size: 3rem;
  font-family: "Monoton", cursive;
  &:hover {
    cursor: pointer;
  }
`;

export default Header;
