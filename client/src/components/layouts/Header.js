import React, { Fragment } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const HeaderBar = styled.header`
  width: 100%;
  top: 0;
  left: 0;
  background-color: #33546d;
  height: 4rem;
  color: #f7efed;
`;

const HeaderNavigation = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 3rem;
`;

const HeaderLogo = styled(NavLink)`
  display: block;
  color: #f7efed;
  text-decoration: none;
  font-size: 1.7rem;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #f7efed;
  }
`;

const SpacerDiv = styled.div`
  flex: 1;
`;

const NavigationItems = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    padding: 0 0.5rem;
  }
`;

const StyledLink = styled(NavLink)`
  color: #f7efed;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 1.2rem;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #f7efed;
  }
`;

function Header() {
  return (
    <HeaderBar>
      <HeaderNavigation>
        <HeaderLogo to="/">HouseFlips</HeaderLogo>
        <SpacerDiv />
        <NavigationItems>
          <ul>
            <li>
              <StyledLink exact to="/market">
                Market
              </StyledLink>
            </li>
            <li>
              <StyledLink exact to="/register">
                Signup
              </StyledLink>
            </li>
            <li>
              <StyledLink exact to="/login">
                Login
              </StyledLink>
            </li>
          </ul>
        </NavigationItems>
      </HeaderNavigation>
    </HeaderBar>
  );
}

export default Header;
