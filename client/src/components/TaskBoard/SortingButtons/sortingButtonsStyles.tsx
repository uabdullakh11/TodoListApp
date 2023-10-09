import styled, { css } from "styled-components";
export const SortingButtonsContainer = styled.div`
  background-color: #9333ea0f;
  border-radius: 10px;
`;

export const StatusButton = styled.div`
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
export const DateButton = styled.div`
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

const SortingButtons = styled.div`
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

export const SortButton = styled(SortingButtons) <{ $button: string }>`
  ${(props) => props.$button === 'all' && css`
  background-image: url("../not-clicked-done-circle.svg");
  &:hover{
    background: url("../clicked-done-circle.svg"), #9333ea0f;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    color: #9333ea;
    border-radius: 10px;
  }
  ` }
  ${(props) => props.$button === 'date' && css`  
  background-image: url("../arrows 1.svg");
  &:hover{
    background: url("../clicked-arrows.svg"), #9333ea0f;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    color: #9333ea;
    border-radius: 10px;
  }` }
  ${(props) => props.$button === 'today' && css`
  &:hover {
    background: url("../today-clicked-icon.svg"), #9333ea0f;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    color: #9333ea;
    border-radius: 10px;
  }
  background-image: url("../today-logo.svg");
  `}`