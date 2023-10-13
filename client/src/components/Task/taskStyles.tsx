import styled from "styled-components";
import Image from "next/image";
export const TaskBlock = styled.div`
`;
export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;
export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  flex-shrink: 10000;
`;
export const DoneButton = styled.span`
  cursor: pointer;
`;
export const OptionsBtn = styled.span`
  cursor: pointer;
`;
export const Options = styled.div`
  border: 1px #7d40ff solid;
  border-radius: 13px;
  width: 60px;
  display: flex;
  flex-direction: row;
  padding-top: 5px;
  padding-bottom: 5px;
  align-items: center;
  justify-content: space-evenly;
  float: right;
  margin-top: 5px;
`;
export const DeleteTask = styled(Image)`
  cursor: pointer;
`;

export const TaskContainer = styled.div`
  padding: 10px 10px;
  border-radius: 10px;
  display: flex;
  background-color: #9333ea0f;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5em;
`;
export const TaskName = styled.span`
  color: #000000;
  word-break: break-word;
  display: inline-block;
  @media (max-width: 600px){
    font-size: 14px;
  }
  /* @media (max-width: 475px) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap
  } */
`;
export const DataLine = styled.span`
  color: #6b7280;
  word-break: break-word;
  @media (max-width: 600px){
    font-size: 14px;
  }
  @media (max-width:500px){
    display: none;
  }
`;