import Link from "next/link";
import styled, { css } from "styled-components";
export const BurgerMenuContainer = styled.div`
display: none;
@media(max-width: 700px) {
  display: block;
}
`
export const MenuLabel = styled.label`
  position: relative;
  cursor: pointer;
  z-index: 3;
`
export const Icon = styled.span<{ $clicked: boolean }>`
position: relative;
background-color: black;
width: 2rem;
height: 3px;
display: inline-block;
transform: ${(props) => (props.$clicked ? "rotate(135deg)" : "rotate(0)")};
transition: all 0.3s;

&::before,
&::after {
  content: "";
  background-color: black;
  width: 2rem;
  height: 3px;
  display: inline-block;
  position: absolute;
  left: 0;
  transition: all 0.3s;
}
&::before {
    top: ${(props) => (props.$clicked ? "0" : "-0.5rem")};
    transform: ${(props) => (props.$clicked ? "rotate(90deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.$clicked ? "0" : "0.5rem")};
    transform: ${(props) => (props.$clicked ? "rotate(-180deg)" : "rotate(0)")};
  }
`
export const SideBar = styled.div`
    /* position: absolute;
    left: 4%;
    top: 12%;
    background-color: #ffffff;
    width: 45vw;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2em;
    padding: 20px;  
    border-radius: 10px;
    z-index: 222; */
    display: block;
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 35%;
    margin: 0;
    padding: 80px 0;
    list-style: none;
    background-color: #ffffff;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, .4);
    transition-duration: .25s;
    border-radius: 0 0 10px 10px;
    z-index: 2;
    text-align: center;
`

export const BackToHome = styled(Link)`
    text-decoration: none;
    background: #9333ea0f;
    color: #9333ea;
    border-radius: 30px;
    padding: 10px 90px;
    cursor: pointer;
    display: inline-block;
    margin-bottom: 15px;
    text-align: center;
`