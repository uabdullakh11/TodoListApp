import styled, { css } from "styled-components";

const StatusButton = styled.div`
  padding: 10px 70px 10px 35px;
  color: #6b7280;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  @media (max-width: 700px) {
    padding: 10px 90px;
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
  @media (max-width: 700px) {
    padding: 10px 65px;
    border-radius: 30px;
  }
`;

export const SortButton = styled(StatusButton) <{ $button: { type: string, isBurger: boolean | undefined } }>`
  ${(props) => props.$button.type === 'all' && css`
  background-image: url("../not-clicked-done-circle.svg");
  ${!props.$button.isBurger && `&:hover{
    background: url("../clicked-done-circle.svg"), #9333ea0f;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    color: #9333ea;
    border-radius: 10px;
  }`}
  @media (max-width: 700px) {
    background: url("../not-clicked-done-circle.svg"), #dfdede;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 65px;
    border-radius: 30px;
  }
  
  ` }
  ${(props) => props.$button.type === 'date' && css`  
    background: url("../arrows 1.svg"), transparent;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    @media (max-width: 700px) {
      background: url("../arrows 1.svg"), #dfdede;
      background-repeat: no-repeat;
      background-position-y: center;
      background-position-x: 65px;
      border-radius: 30px;
  }
  ${!props.$button.isBurger && `&:hover{
    background: url("../clicked-arrows.svg"), #9333ea0f;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    color: #9333ea;
    border-radius: 10px;
  }`}
  `
  }
  ${(props) => props.$button.type === 'today' && css`
  ${!props.$button.isBurger && `&:hover {
    background: url("../today-clicked-icon.svg"), #9333ea0f;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    color: #9333ea;
    border-radius: 10px;
  }`}
  background-image: url("../today-logo.svg");
  @media (max-width: 700px) {
    background: url("../today-logo.svg"), #dfdede;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 65px;
    border-radius: 30px;
  }
  `}
`