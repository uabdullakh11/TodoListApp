import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const InOutBtn = styled.button`
  border-radius: 5px;
  border: none;
  color: #9333ea;
  padding: 10px 70px;
  margin-top: 40px;
  cursor: pointer;
`;
export const AuthButton = styled(InOutBtn)`
  background: url("../auth-btn-icon.svg"), #9333ea0f;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 40px;
  background-size: 30px;
  &:hover,
  &:active {
    background-color: #8600ff0f;
    color: #8203f6;
    font-weight: bold;
  }
  &:focus {
    box-shadow: 0 0 0 3px #8203f6;
    outline: none;
  }
`;

export const EditButton = styled(Image)`
  cursor: pointer;
`;

export const LinkButton = styled(Link)`
  text-decoration: none;
  align-self: center;
  border-radius: 5px;
  border: none;
  color: #701cbd;
  padding: 10px 70px;
  cursor: pointer;
  background: #9333ea38;
  &:hover,
  &:active {
    background-color: #8600ff0f;
    color: #8203f6;
    font-weight: bold;
  }
  &:focus {
    box-shadow: 0 0 0 3px #8203f6;
    outline: none;
  }
`;
