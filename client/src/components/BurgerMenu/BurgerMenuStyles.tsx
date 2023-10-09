import Link from "next/link";
import styled, { css } from "styled-components";
export const BurgerMenuContainer = styled.div`
display: none;
@media(max-width: 700px) {
  display: block;
}
`
export const MenuLabel = styled.label`
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
    position: absolute;
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
    z-index: 222;
`

export const BackToHome = styled(Link)`
    text-decoration: none;
    background: #9333ea0f;
    color: #9333ea;
    border-radius: 10px;
    padding: 10px 30px;
    cursor: pointer;
`