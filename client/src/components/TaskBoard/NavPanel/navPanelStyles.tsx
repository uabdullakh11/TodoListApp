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



export const SortingContainer = styled.div`
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