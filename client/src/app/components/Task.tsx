"use client";
import React, { useState, FC, useEffect } from "react";
import useModal from "../utils/hooks/useModal";
import Image from "next/image";
import { Modal } from "./Modal";
import {
  DeleteTask,
  DoneButton,
  EditTask,
  LeftContainer,
  Options,
  OptionsBtn,
  RightContainer,
  TaskBlock,
} from "../styles/task";
import { DataLine, TaskName } from "../styles/text";
import { TaskContainer } from "../styles/containers";
import useDate from "../utils/hooks/useDate";

interface TaskProps {
  isCompleted: boolean;
  id: number;
  name: string;
  date: string;
}
interface TaskInterface {
  id: number;
  name: string;
  isCompleted: boolean;
  date: string;
}

const Task: FC<TaskProps> = ({ isCompleted, id, name, date }) => {
  const [, currrentDate, ] = useDate();
  const [isShowingModal, toggleModal] = useModal();

  const [isDone, setIsDone] = useState<boolean>(false);
  const [taskdate, setTaskDate] = useState<string>("");
  const [isOptionsBtnClicked, setOptionsBtnClicked] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>("");

  const handleClickDoneBtn = () => {
    //isDone ? setIsDone(false) : setIsDone(true);
    const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTasks = oldTasks.map((item:TaskInterface) => {
      if (item.name === name) {
        item.isCompleted = !isCompleted;
      }
      return item;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  const handleClickEditBtn = () => {
    isOptionsBtnClicked
      ? setOptionsBtnClicked(false)
      : setOptionsBtnClicked(true);
  };
  const handleEditTask = () => {
    setOptionsBtnClicked(false);
    setTypeModal("editModal");
    toggleModal();
  };
  const handleDeleteTask = () => {
    setOptionsBtnClicked(false);
    setTypeModal("deleteModal");
    toggleModal();
  };
  useEffect(() => {
    if (isCompleted) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }, []);

  useEffect(() => {
    if (date.slice(0, 9) === currrentDate) {
      setTaskDate(`Today at ${date.slice(11,16)}`)
    }
    else if (Number(date.slice(2, 4))===Number(currrentDate.slice(2,4))-1) {
      setTaskDate(`Yesterday at ${date.slice(11,16)}`)
    }
    else {
      setTaskDate(`${date.slice(0, 9)} at ${date.slice(11,16)}`)
    }
  }, []);
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
          <DataLine>{taskdate}</DataLine>
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
      <Modal
        show={isShowingModal}
        onCloseButtonClick={toggleModal}
        type={typeModal}
        taskname={name}
      />
    </TaskBlock>
  );
};
export { Task };
