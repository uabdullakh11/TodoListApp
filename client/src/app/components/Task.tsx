"use client";
import styled from "styled-components";
import Image from "next/image";
import React,{ useState, FC } from "react";
import useModal from "../utils/hooks/useModal";
import { Modal } from "./Modal";
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
`;
const EditTask = styled(Image)`
  cursor: pointer;
`;

interface TaskProps {
  isCompleted: boolean;
  id: number;
  name: string;
  date: string;
};
// const TheTask:FC<TheTaskProps> = ({isDone,id,name,date}: TheTaskProps) => {}

const Task: FC<TaskProps> = ({isCompleted,id,name,date}) => {
  const [isShowingModal, toggleModal] = useModal();

  const [isDone, setIsDone] = useState<boolean>(false);
  const [isOptionsBtnClicked, setOptionsBtnClicked] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>("");

  const handleClickDoneBtn = () => {
    // isDone ? setIsDone(false) : setIsDone(true);
    if (isDone){
      setIsDone(false)
      const obj = {
        name: name,
        isCompleted: false,
        date:"Today, 18:30"
      }
      //localStorage.setItem('task', JSON.stringify(obj));
    }
    else {
      setIsDone(true)
      const obj = {
        name: name,
        isCompleted: true,
        date:"Today, 18:30"
      }
      //localStorage.setItem('task', JSON.stringify(obj));
    }
  };
  const handleClickEditBtn = () => {
    isOptionsBtnClicked
      ? setOptionsBtnClicked(false)
      : setOptionsBtnClicked(true);
  };
  const handleEditTask = () => {
    setOptionsBtnClicked(false);
    setTypeModal("editModal")
    toggleModal();
  };
  const handleDeleteTask = () => {
    setOptionsBtnClicked(false);
    setTypeModal("deleteModal")
    toggleModal();
  };
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
          <TaskName>{name}</TaskName>
        </LeftContainer>
        <RightContainer>
          <DataLine>{date}</DataLine>
          <OptionsBtn onClick={handleClickEditBtn}>
            <Image src="edit-dots.svg" alt="" width={20} height={20} />
          </OptionsBtn>
        </RightContainer>
      </TaskContainer>
      {isOptionsBtnClicked ? (
        <Options>
          <EditTask
            onClick={handleEditTask}
            src="edit-icon.svg"
            alt=""
            width={20}
            height={20}
          />
          <DeleteTask
            onClick={handleDeleteTask}
            src="delete-icon.svg"
            alt=""
            width={20}
            height={20}
          />
        </Options>
      ) : null}
      {/* <DeleteTaskModal show={isShowingModal}  onCloseButtonClick={toggleModal}/> */}
      {/* <EditTaskModal show={isShowingModal}  onCloseButtonClick={toggleModal}/> */}
      <Modal show={isShowingModal}  onCloseButtonClick={toggleModal} type={typeModal} />
      
    </TaskBlock>
  );
};
export { Task };
