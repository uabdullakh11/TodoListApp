import styled from "styled-components";
import Image from "next/image";
export const TaskBlock = styled.div`
position: relative;
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
  /* flex-shrink: 10000; */
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
  position: absolute;
  right: 0;
  z-index: 22;
  background-color: #FFFFFF;
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
  width: 20vmax;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 900px){
      /* width: 150px; */
  }
  @media (max-width: 600px){
    font-size: 14px;
  }
  @media (max-width:500px){
    /* width: 200px; */
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
export const Tooltip = styled.div`
    width: 100%;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    z-index: 25;
    transition: opacity 0.3s;
    position: absolute;
    left: 0;
    &::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 10%;
  transform: rotate(45deg);
  background-color: #555;
  padding: 5px;
}
`