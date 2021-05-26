import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { user } from "./LocalUser";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatar = user.user.avatar;
  function toggleMenu(e) {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <StyledHeader onClick={isMenuOpen ? toggleMenu : undefined}>
        <ShowMenuButton onClick={toggleMenu}>
          <Chevron isMenuOpen={isMenuOpen} /> <UserImage avatar={avatar} />
        </ShowMenuButton>
      </StyledHeader>
      <ContentOverlay isMenuOpen={isMenuOpen} onClick={toggleMenu} />
      <Menu isMenuOpen={isMenuOpen}>
        <li onClick={toggleMenu}>
          <Link to="/timeline">My Posts</Link>
        </li>
        <li onClick={toggleMenu}>
          <Link to="/timeline">My Likes</Link>
        </li>
        <li onClick={toggleMenu}>
          <Link to="/timeline">Logout</Link>
        </li>
      </Menu>
    </>
  );
}

const ContentOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${(props) => (props.isMenuOpen ? "block" : "none")};
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
`;
const UserImage = styled.div`
  border-radius: 50%;
  margin: 0px 16px 0px 26px;
  width: 53px;
  height: 53px;
  background-image: url("${(props) => props.avatar}");
  background-size: cover;
  background-position: center;
`;
const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 3;
`;

const ShowMenuButton = styled.button`
  height: 100%;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Chevron = styled.div`
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  width: 20px;
  height: 20px;
  transform: rotate(${(props) => (props.isMenuOpen ? "225" : "45")}deg);
  transition: 0.5s;
`;

const Menu = styled.ul`
  background-color: #151515;
  width: 150px;
  position: absolute;
  top: ${(props) => (props.isMenuOpen ? "72px" : "-50px")};
  right: -20px;
  transition: 0.5s;
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;
  border-radius: 0px 0px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-right: 20px;
  z-index: 2;
  li {
    width: 100%;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      padding: 5px 0px 10px;
    }
  }
`;
