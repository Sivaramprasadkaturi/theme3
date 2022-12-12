import React, { useState } from "react";
import styled from "styled-components";
import RightNav from "./MobileNavMenu";
import { IoMenuOutline } from "react-icons/io5";

const StyledBurger = styled.div`
  position: absolute;
  width: 2rem;
  height: 1.5rem;
  display: none;
  margin-left: 0px;

  @media (max-width: 1023px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  .humenu {
    width: 1.6rem;
    height: 0.10rem;
    background-color: #222;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      /* transform: ${({ open }) =>
        open ? "translateX(100%)" : "translateX(0)"}; */
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const HamburgerMenu = ({ menu }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div className="humenu" />
        <div className="humenu" />
        <div className="humenu" />
      </StyledBurger>
      <RightNav
        open={open}
        close={() => setOpen(false)}
        toggle={() => setOpen(!open)}
        menu={menu}
      />
    </>
  );
};

export default HamburgerMenu;
