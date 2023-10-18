import React, { useState, FC, useEffect } from "react";
import useModal from "@/utils/hooks/useModal";
import Image from "next/image";
import { Modal } from "../Modal/Modal";
import {
  DeleteTask,
  DoneButton,
  LeftContainer,
  Options,
  OptionsBtn,
  RightContainer,
  TaskBlock,
  TaskContainer,
  DataLine,
  TaskName,
  Tooltip
} from "./taskStyles";
import getDate from "@/helpers/getDate";
import { TasksContext } from "@/context/TasksContext";
import { TasksContextType } from "@/types/types";
import { EditButton } from "@/styles/buttons";
import { useClickOutside } from '../../utils/hooks/useClickOutside';
import { ModalBody, ModalButtons, ModalCloseButton, ModalDeleteButton, ModalHeader, ModalSaveButton, ModalText } from "../Modal/modalStyles";
import { ErrorCaption } from "@/styles/text";
import { Input } from "@/styles/inputs";
import { toast } from 'react-toastify';

interface TasksProps {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}
const Task: FC<TasksProps> = ({ completed, id, title, date }) => {
  const { updateTask, deleteTask, editTask } = React.useContext(TasksContext) as TasksContextType;

  const { currentDate, yesterdayTime } = getDate();
  const [isShowingModal, toggleModal] = useModal();

  const [taskdate, setTaskDate] = useState("");
  const [isOptionsBtnClicked, setOptionsBtnClicked] = useState(false);
  const [errorCaption, setErrorCaption] = useState("");
  const [changeTitle, setChangeTitle] = useState("")
  const [typeModal, setTypeModal] = useState("");
  const [toolTipShow, setToolTipShow] = useState(false)

  const handleClickDoneBtn = async () => {
    const todo = {
      completed: !completed,
      id,
      title,
      date
    }
    updateTask(todo)
  };
  const handleClickEditBtn = () => {
    setOptionsBtnClicked(!isOptionsBtnClicked)
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

  const ref = useClickOutside(() => {
    setOptionsBtnClicked(false)
  });

  const handleCloseButton = () => {
    toggleModal(false)
    setErrorCaption("");
  }

  const handleError = (error: string) => {
    setErrorCaption(error)
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement
      target.id === "change-name-input" && handleChangeClick();
    }
  }

  const handleDeleteClick = async () => {
    deleteTask(id)
    toast.info(`Task ${title} was delete!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    toggleModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    setChangeTitle(element.value)
  }

  const handleChangeClick = async () => {
    if (changeTitle.trim()) {
      const todo = {
        id: id,
        title: changeTitle.trim(),
        completed: completed,
        date: date,
      };
      const isSuccess = await editTask(todo, handleError)
      if (isSuccess) {
        toast.info(`${title} was changed to ${changeTitle.trim()}!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleCloseButton()
      };

    } else {
      setErrorCaption("Please enter name of task!");
    }
  };

  useEffect(() => {
    let lastIndexTime = date.split("").lastIndexOf(":");
    let lastIndexDate = date.split("").indexOf(",");

    if (date.slice(0, lastIndexDate) === currentDate) {
      setTaskDate(`Today at ${date.slice(11, lastIndexTime)}`)
    }
    else if (date.slice(0, lastIndexDate) === yesterdayTime) {
      setTaskDate(`Yesterday at ${date.slice(11, lastIndexTime)}`)
    }
    else {
      setTaskDate(`${date.slice(0, lastIndexDate)} at ${date.slice(11, lastIndexTime)}`)
    }

  }, [date, currentDate, yesterdayTime]);


  return (
    <TaskBlock ref={ref}>
      <TaskContainer>
        <LeftContainer>
          <DoneButton>
            <Image
              src={!completed ? `../not-done-task.svg` : `../done-task.svg`}
              alt=""
              width={20}
              height={20}
              onClick={handleClickDoneBtn}
            />
          </DoneButton>
          <TaskName onMouseEnter={() =>  setToolTipShow(true)}
            onMouseLeave={() => setToolTipShow(false)}>{title}</TaskName>
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
          <EditButton
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
      {toolTipShow && <Tooltip>{title}</Tooltip>}
      <Modal
        show={isShowingModal}
        onCloseButtonClick={toggleModal}
      >
        {typeModal === "editModal" ? (
          <>
            <ModalHeader>Edit Task</ModalHeader>
            <ModalBody>
              <Input
                placeholder="Change name of task..."
                name="change-name-input"
                id="change-name-input"
                autoFocus={true}
                onChange={handleInputChange}
                onKeyDown={handleEnterPress}
              />
              <ErrorCaption>{errorCaption}</ErrorCaption>
              <ModalButtons>
                <ModalSaveButton onClick={handleChangeClick}>
                  Change
                </ModalSaveButton>
                <ModalCloseButton onClick={handleCloseButton}>
                  Close
                </ModalCloseButton>
              </ModalButtons>
            </ModalBody>
          </>)
          :
          (
            <>
              <ModalHeader>Delete Task</ModalHeader>
              <ModalBody>
                <ModalText>Are you sure about deleting this task?</ModalText>
                <ModalButtons>
                  <ModalDeleteButton onClick={handleDeleteClick}>
                    Delete
                  </ModalDeleteButton>
                  <ModalCloseButton onClick={handleCloseButton}>
                    Close
                  </ModalCloseButton>
                </ModalButtons>
              </ModalBody>
            </>
          )
        }
      </Modal>
    </TaskBlock>
  );
};
// export {Task};
export default Task;
