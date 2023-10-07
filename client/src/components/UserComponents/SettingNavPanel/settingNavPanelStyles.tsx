import styled, {css} from "styled-components";


export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  @media (max-width: 689px) {
    flex-direction: row;
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
  background-position-x: 40px;
  background-size: 25px;
  margin-top: 50px;
  border-radius: 5px;
  border: none;
  color: #9333ea;
  padding: 10px 70px;
  margin-top: 40px;
  cursor: pointer;
`;

const UserProfileButtons = styled.div`
  padding: 10px 30px;
  color: #6b7280;
  cursor: pointer;
  padding-right: 70px;
  padding-left: 35px;
  @media (max-width: 689px) {
    padding-right: 35px;
  }
`;
export const ProfileBtn = styled(UserProfileButtons)<{ $active: boolean }>`
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
  background-size: 25px;
`;
export const SecurtyBtn = styled(UserProfileButtons)<{ $active: boolean }>`
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
  background-size: 25px;
`;
