import styled from "styled-components";
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const UserInnerContainer = styled.div`
max-width: 220px;
display: flex;
gap: 1em;
`;
export const UserContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
gap: 0.5rem;
`;
const ChangeInput = styled.textarea`
  text-align: center;
  height: 20px;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  outline: none;
  resize: none;
  box-shadow: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
`;
export const UserNameInput = styled(ChangeInput)`
  color: #404040;
  font-size: 18px;
  font-weight: 700;
  &:focus{
    box-shadow: 0 0 0 3px lightskyblue;
    outline: none;
  }
`;

export const EmailInput = styled(ChangeInput)`
  color: #6b7280;
  font-size: 16px;
  width: 25vw;
  &:focus{
    box-shadow: 0 0 0 3px lightskyblue;
    outline: none;
  }
`;
const userDataButton = styled.button`
padding: 10px 60px;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 30px;
  width: 100%;
  border: none;
  cursor: pointer;
  @media (max-width: 400px) {
    padding: 10px 40px;
    background-position-x: 10px;
  }
`;
export const ChangeBtn = styled(userDataButton)`
  background-image: url("../save-btn-icon.svg");
  color: #67b8cb;
  padding: 10px 10px;
  background-image: none;
  width: auto;
  &:hover {
    background-color: #aaa;
    color: #fff;
    font-weight: bold;
  }
  &:focus{
    box-shadow: 0 0 0 3px lightskyblue;
    outline: none;
  }
  &:active{
    background-color: #fff;
    color: #000;
  }
`;
export const CancelBtn = styled(userDataButton)`
  background-image: url("../close-btn-icon.svg");
  color: #6b7280;
  padding: 10px 10px;
  background-image: none;
  width: auto;
  &:hover {
    background-color: #aaa;
    color: #fff;
    font-weight: bold;
  }
  &:focus{
    box-shadow: 0 0 0 3px lightskyblue;
    outline: none;
  }
  &:active{
    background-color: #fff;
    color: #000;
  }
`;