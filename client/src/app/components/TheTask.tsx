"use client";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
const TaskBlock = styled.div`
  border-radius: 10px;
  background-color: #9333ea0f;
  font-family: "Roboto", sans-serif;
`;
const TaskContainer = styled.div`
  padding: 10px 10px;
  display: flex;
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
const EditBtn = styled.span`
  cursor: pointer;
`;
const Options = styled.div`
  display: none;
  border: 1px #7d40ff solid;
`;

const TheTask = () => {
  const [isDone, setIsDone] = useState(false);
  const handleClickDoneBtn = (e: any) => {
    isDone ? setIsDone(false) : setIsDone(true);
  };
  return (
    <>
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
            <EditBtn>
              <Image src="edit-dots.svg" alt="" width={20} height={20} />
            </EditBtn>
          </RightContainer>
        </TaskContainer>
      </TaskBlock>
      <Options>
        <Image src="edit-icon.svg" alt="" width={20} height={20} />
        <Image src="delete-icon.svg" alt="" width={20} height={20} />
      </Options>
    </>
  );
};
export { TheTask };
