import styled, { css } from "styled-components";

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1em;
  @media (max-width: 700px) {
    align-items: center;
  }
`;

export const LogOutBtn = styled.button`
  background: url("../logout-btn.svg"), #9333ea0f;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 20px;
  background-size: 25px;
  border-radius: 5px;
  border: none;
  color: #9333ea;
  padding: 10px 55px;
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
    padding: 10px 90px;
    background: url("../logout-btn.svg"), #9333ea0f;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 60px;
    background-size: 25px;
    border-radius: 30px;
  }
`;

export const UserProfileButtons = styled.div<{ $button: string, $active: boolean }>`
  padding: 10px 70px 10px 35px;
  color: #6b7280;
  cursor: pointer;
  text-indent: 10px;
  border-radius: 10px;
  ${(props) => props.$button === 'profile' && css`
  background: url("../person-logo.svg");
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  background-size: 25px;
  @media (max-width: 700px) {
    background: url("../person-logo.svg"), #dfdede;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 65px;
    border-radius: 30px;
    background-size: 25px;
    padding: 10px 90px;
  }
  &:hover, &:active {
    color: #9333ea;
    font-weight: bold;
    background: url("../person-logo.svg"), #9333ea0f;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    background-size: 25px;
  }
  &:focus{
    box-shadow: 0 0 0 3px #8203f6;
    outline: none;
  }
  ` }
  ${(props) => props.$button === 'security' && css`
    background: url("../security-btn-icon.svg");
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    background-size: 25px;
    @media (max-width: 700px) {
      background: url("../security-btn-icon.svg"), #dfdede;
      background-repeat: no-repeat;
      background-position-y: center;
      background-position-x: 65px;
    border-radius: 30px;
      background-size: 25px;
      padding: 10px 85px;
  }
  &:hover, &:active {
    color: #9333ea;
    font-weight: bold;
    background: url("../security-btn-icon.svg"), #9333ea0f;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    background-size: 25px;
  }
  &:focus{
    box-shadow: 0 0 0 3px #8203f6;
    outline: none;
  }
  `
  }
  
  ${(props) => props.$active && css`
  background-color: #9333ea0f;
  color: #9333ea;
  border-radius: 10px;
`}
`;

export const DeleteAccountBtn = styled.button`
  background: url("../delete-icon.svg"), #f564970f;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 30px;
  background-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  border: none;
  color: #f56497;
  &:hover {
    background-color: #da80a0;
    color: #f56497;
    font-weight: bold;
  }
  &:focus{
    box-shadow: 0 0 0 3px lightskyblue;
    outline: none;
  }
  &:active{
    background-color: #fff;
    color: #e41960;
  }
  @media (max-width: 700px) {
    margin-top: 0px;
    padding: 10px 90px;
    background: url("../delete-icon.svg"), #9333ea0f;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 60px;
    background-size: 25px;
    border-radius: 30px;
  }
`