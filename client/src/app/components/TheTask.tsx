"use client";
import styled from "styled-components";
import Image from "next/image";
import { useRef, useState } from "react";
const TaskBlock = styled.div`
  font-family: "Roboto", sans-serif;
`;
const TaskContainer = styled.div`
  padding: 10px 10px;
  border-radius: 10px;
  display: flex;
  background-color: #9333ea0f;
  flex-direction: row;
  justify-content: space-between;
`;
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
const DoneButton = styled.span`
  cursor: pointer;
`;
const TaskName = styled.span`
  color: #000000;
`;
const DataLine = styled.span`
  color: #6b7280;
`;
const OptionsBtn = styled.span`
  cursor: pointer;
`;
const Options = styled.div`
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
const DeleteTask = styled(Image)`
cursor: pointer;
`
const EditTask = styled(Image)`cursor: pointer;`

// interface TheTaskProps {
//   isOpen: boolean
// };
// const TheTask: <TheTaskProps> = ({ isOpen}) => {}

const TheTask = () => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isOptionsBtnClicked, setOptionsBtnClicked] = useState<boolean>(false)
  const handleClickDoneBtn = () => {
    isDone ? setIsDone(false) : setIsDone(true);
  };
  const handleClickEditBtn = () => {
    isOptionsBtnClicked ? setOptionsBtnClicked(false) : setOptionsBtnClicked(true);
  }
  return (
    <TaskBlock>
      <TaskContainer>
        <LeftContainer>
          <DoneButton>
            <Image
              src={!isDone ? `not-done-task.svg` : `done-task.svg`}
              alt=""
              width={20}
              height={20}
              onClick={handleClickDoneBtn}
            />
          </DoneButton>
          <TaskName>Task 1</TaskName>
        </LeftContainer>
        <RightContainer>
          <DataLine>Today at 18.30</DataLine>
          <OptionsBtn onClick={handleClickEditBtn}>
            <Image src="edit-dots.svg" alt="" width={20} height={20} />
          </OptionsBtn>
        </RightContainer>
      </TaskContainer>
      {isOptionsBtnClicked ? <Options>
        <EditTask src="edit-icon.svg" alt="" width={20} height={20} />
        <DeleteTask src="delete-icon.svg" alt="" width={20} height={20} />
      </Options> : null}
    </TaskBlock>
  );
};
export { TheTask };
