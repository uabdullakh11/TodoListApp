import styled, { css } from "styled-components";
const ModalButton = styled.button`
  padding: 10px 60px;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 30px;
  width: 100%;
  border: none;
  @media (max-width: 400px) {
    padding: 10px 40px;
    background-position-x: 10px;
  }
`;
export const ModalDeleteButton = styled(ModalButton)`
  background: url("../delete-icon.svg"), #f564970f;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 30px;
  background-size: 20px;
  color: #f56497;
`;
export const ModalSaveButton = styled(ModalButton)`
  background-image: url("../save-btn-icon.svg");
  color: #67b8cb;
`;
export const ModalCloseButton = styled(ModalButton)`
  background-image: url("../close-btn-icon.svg");
  color: #6b7280;
`;
const DateButton = styled.div`
  padding: 10px 30px;
  color: #9333ea;
  cursor: pointer;
  background: url("../clicked-arrows.svg");
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  border-radius: 10px;
  padding-left: 35px;
`;
export const NewBtn = styled(DateButton)``;
export const PastBtn = styled(DateButton)``;
const StatusButton = styled.div`
  padding: 10px 30px;
  color: #6b7280;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  padding-right: 70px;
  padding-left: 35px;
  @media (max-width: 689px) {
    padding-right: 35px;
  }
`;
export const TodayBtn = styled(StatusButton)<{ $active: boolean }>`
  ${(props) =>
    props.$active
      ? css`
          background: url("../today-clicked-icon.svg"), #9333ea0f;
          background-repeat: no-repeat;
          background-position-y: center;
          background-position-x: 10px;
          color: #9333ea;
          border-radius: 10px;
        `
      : css`
          background-image: url("../today-logo.svg");
        `}
`;
export const AllBtn = styled(StatusButton)<{ $active: boolean }>`
  ${(props) =>
    props.$active
      ? css`
          background: url("../clicked-done-circle.svg");
          background-repeat: no-repeat;
          background-position-y: center;
          background-position-x: 10px;
          color: #9333ea;
          border-radius: 10px;
        `
      : css`
          background-image: url("../not-clicked-done-circle.svg");
        `}
`;
export const DateBtn = styled(StatusButton)`
  background-image: url("../arrows 1.svg");
`;
export const AddTaskBtn = styled.button`
  background: #9333ea0f;
  border-radius: 10px;
  outline: none;
  border: none;
  color: #9333ea;
  padding: 10px 30px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
`;

const Button = styled.div`
  color: #9333ea;
  cursor: pointer;
  background: url("../clicked-done-circle.svg");
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  border-radius: 10px;
  padding: 10px 70px 10px 35px;
  @media (max-width: 689px) {
    padding: 10px 35px;
  }
`;
export const DoneBtn = styled(Button)``;
export const UndoneBtn = styled(Button)``;

export const AuthButton = styled.button`
  background: url("../auth-btn-icon.svg"), #9333ea0f;
  border-radius: 5px;
  border: none;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 40px;
  background-size: 30px;
  color: #9333ea;
  padding: 10px 70px;
  margin-top: 40px;
`;
