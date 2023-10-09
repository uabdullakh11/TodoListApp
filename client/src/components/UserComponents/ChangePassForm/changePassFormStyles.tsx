import styled from "styled-components";
export const ChangePassBtn = styled.button`
  background: url("../change-password-icon-btn.svg"), #9333ea0f;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 40px;
  background-size: 25px;
  border-radius: 5px;
  border: none;
  color: #9333ea;
  padding: 10px 70px;
  margin-top: 40px;
  cursor: pointer;
  &:hover, &:active {
    background-color: #8600ff0f;
    color: #8203f6;
    font-weight: bold;
  }
  &:focus{
    box-shadow: 0 0 0 3px #8203f6;
    outline: none;
  }
`;