import React, { useState, FC, useEffect } from "react";
import useModal from "@/utils/hooks/useModal";
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
import { DataLine, TaskName } from "@/styles/text";
import { TaskContainer } from "@/styles/containers";
import getDate from "@/helpers/getDate";
import { TasksContext } from "@/context/TasksContext";
import { TasksContextType } from "@/types/types";

interface TasksProps {
  id: number;
  title: string;
  completed: boolean;
  date: string;
}
const Task: FC<TasksProps> = ({ completed, id, title, date }) => {
  const { updateTask } = React.useContext(TasksContext) as TasksContextType;

  const { currentDate } = getDate();
  const [isShowingModal, toggleModal] = useModal();

  const [isDone, setIsDone] = useState<boolean>(false);
  const [taskdate, setTaskDate] = useState<string>("");
  const [isOptionsBtnClicked, setOptionsBtnClicked] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>("");

  const handleClickDoneBtn = async () => {
    updateTask({ completed, id, title, date })
  };
  const handleClickEditBtn = () => {
    isOptionsBtnClicked
      ? setOptionsBtnClicked(false)
      : setOptionsBtnClicked(true);
  };
  const handleEditTask = () => {
    setOptionsBtnClicked(false);
    setTypeModal("editModal");
    toggleModal(true);
  };
  const handleDeleteTask = () => {
    setOptionsBtnClicked(false);
    setTypeModal("deleteModal");
    toggleModal(true);
  };
  useEffect(() => {
    if (completed) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }, [completed]);

  useEffect(() => {
    // let day = new Date();
    // day.setDate(day.getDate() - 1);
    // console.log(day.toLocaleString("en-US"));
    // console.log(date.toDateString());
    console.log(Math.floor(new Date().getTime()/1000-86400))
    if (date.slice(0, 9) === currentDate) {
      setTaskDate(`Today at ${date.slice(11, 16)}`)
    }
    else if (Number(date.slice(2, 4)) === Number(currentDate.slice(2, 4)) - 1) {
      setTaskDate(`Yesterday at ${date.slice(11, 16)}`)
    }
    else {
      setTaskDate(`${date.slice(0, 9)} at ${date.slice(11, 16)}`)
    }
  }, [date, currentDate]);
  return (
    <TaskBlock>
      <TaskContainer>
        <LeftContainer>
          <DoneButton>
            <Image
              src={!isDone ? `../not-done-task.svg` : `../done-task.svg`}
              alt=""
              width={20}
              height={20}
              onClick={handleClickDoneBtn}
            />
          </DoneButton>
          <TaskName>{title}</TaskName>
        </LeftContainer>
        <RightContainer>
          <DataLine>{taskdate}</DataLine>
          <OptionsBtn onClick={handleClickEditBtn}>
            <Image src="../edit-dots.svg" alt="" width={20} height={20} />
          </OptionsBtn>
        </RightContainer>
      </TaskContainer>
      {isOptionsBtnClicked ? (
        <Options>
          <EditTask
            onClick={handleEditTask}
            src="../edit-icon.svg"
            alt=""
            width={20}
            height={20}
          />
          <DeleteTask
            onClick={handleDeleteTask}
            src="../delete-icon.svg"
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
        taskObj={{ completed, id, title, date }}
      />
    </TaskBlock>
  );
};
export { Task };
