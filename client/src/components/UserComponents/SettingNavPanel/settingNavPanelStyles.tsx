import styled, { css } from "styled-components";


export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1em;
  @media (max-width: 700px) {
    align-items: center;
  }
  @media (max-width: 360px) {
    gap: 0;
  }
`;


export const LogOutBtn = styled.button`
  background: url("../logout-btn.svg"), #9333ea0f;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 20px;
  background-size: 25px;
  margin-top: 50px;
  border-radius: 5px;
  border: none;
  color: #9333ea;
  padding: 10px 55px;
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
  @media (max-width: 700px) {
    margin-top: 0px;
  }
`;

const UserProfileButtons = styled.div`
  padding: 10px 30px;
  color: #6b7280;
  cursor: pointer;
  padding-right: 70px;
  padding-left: 35px;
  text-indent: 10px;
  @media (max-width: 700px) {
    padding-right: 35px;
  }
`;
export const ProfileBtn = styled(UserProfileButtons) <{ $active: boolean }>`
&:hover, &:active {
  background: url("../person-logo.svg"), #9333ea0f;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  background-size: 25px;
  color: #9333ea;
  border-radius: 10px;
  font-weight: bold;
}
&:focus{
  box-shadow: 0 0 0 3px #8203f6;
  outline: none;
}
  ${(props) =>
    props.$active
      ? css`
          background: url("../person-logo.svg"), #9333ea0f;
          color: #9333ea;
          border-radius: 10px;
        `
      : css`
          background: url("../person-logo.svg");
        `}
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
    background-size: 25px;
  
`;
export const SecurtyBtn = styled(UserProfileButtons) <{ $active: boolean }>`
&:hover, &:active {
  background: url("../security-btn-icon.svg"), #9333ea0f;
          color: #9333ea;
          border-radius: 10px;
          background-repeat: no-repeat;
          background-position-y: center;
          background-position-x: 10px;
          background-size: 25px;
  font-weight: bold;
}
&:focus{
  box-shadow: 0 0 0 3px #8203f6;
  outline: none;
}
  ${(props) =>
    props.$active
      ? css`
          background: url("../security-btn-icon.svg"), #9333ea0f;
          color: #9333ea;
          border-radius: 10px;
        `
      : css`
          background: url("../security-btn-icon.svg");
        `}
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  background-size: 25px;
`;
