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
export const EditTask = styled(Image)`
  cursor: pointer;
`;