import type { NextPage } from "next";
import styled from "styled-components";

const Home: NextPage = () => {
  const handleSignUp = () => {
    // sign up via /api/register
  };

  const handleLogInOut = () => {
    // create new login/logout route (check against db) & global state
    if (loggedIn) {
      // log out
    }
    if (!loggedIn) {
      // log in
    }
  };

  // Logic for this - context/redux store?
  const loggedIn = false;

  return (
    <Wrapper>
      <Button onClick={handleSignUp}>Sign Up</Button>
      <Button onClick={handleLogInOut}>
        {loggedIn ? "Log Out" : "Log In"}
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
