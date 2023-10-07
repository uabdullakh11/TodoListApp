import styled, { css }  from "styled-components";

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
export const SortingButtonsContainer = styled.div`
  background-color: #9333ea0f;
  border-radius: 10px;
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