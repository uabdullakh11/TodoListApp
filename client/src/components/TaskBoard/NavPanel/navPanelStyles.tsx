import styled, { css } from "styled-components";

const StatusButton = styled.div`
  padding: 10px 70px 10px 35px;
  color: #6b7280;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  @media (max-width: 700px) {
    padding-right: 35px;
  }
`;

export const SortingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
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
  &:hover {
    background-color: #8600ff0f;
    color: #8203f6;
    font-weight: bold;
  }
  &:focus{
    box-shadow: 0 0 0 3px #8203f6;
    outline: none;
  }
  &:active{
    background-color: #8600ff0f;
    color: #8203f6;
  }
`;

export const SortButton = styled(StatusButton) <{ $button: string }>`
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
  `}
`