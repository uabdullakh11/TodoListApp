import React, { useEffect, useRef, useState, FC } from "react";
import {
  ModalBlock,
  ModalBody,
  ModalButtons,
  ModalHeader,
} from "@/styles/modal";
import { ModalContainer } from "@/styles/containers";
import { Input } from "@/styles/inputs";
import {
  ModalCloseButton,
  ModalDeleteButton,
  ModalSaveButton,
} from "../styles/buttons";
import { ErrorCaption, ModalText } from "../styles/text";
import getDate from "../helpers/getDate";
import { TasksContextType } from "../types/types";
import { TasksContext } from "../context/TasksContext";
import { useClickOutside } from '../utils/hooks/useClickOutside';

interface ModalProps {
  show: boolean;
  type: string;
  taskObj: { completed: boolean, id: number, title: string, date: string }
  onCloseButtonClick: (isShow: boolean) => void;
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const { addTask, deleteTask, editTask } = React.useContext(
    TasksContext
  ) as TasksContextType;

  const { fullDate } = getDate();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const changeNameRef = useRef<HTMLInputElement>(null);

  const [errorCaption, setErrorCaption] = useState("");

  const handleError = (error: string) => {
    setErrorCaption(error)
  }
  const handleCloseButton = () => {
    props.onCloseButtonClick(false)
    setErrorCaption("");
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement
      target.id === "enter-name-input" && handleSaveClick();
      target.id === "change-name-input" && handleChangeClick();
    }
  }

  const handleSaveClick = async () => {
    if (nameInputRef.current && nameInputRef.current.value.trim()) {
      const todo = {
        title: nameInputRef.current.value,
        completed: false,
        date: fullDate,
      };
      const isSuccess = await addTask(todo, handleError)
      isSuccess ? handleCloseButton() : false;
    } else {
      setErrorCaption("Please enter name of task!");
    }
  };
  const handleDeleteClick = async () => {
    deleteTask(props.taskObj.id)
    props.onCloseButtonClick(false);
  };
  
  const handleChangeClick = async () => {
    if (changeNameRef.current && changeNameRef.current.value.trim()) {
      const todo = {
        id: props.taskObj.id,
        title: changeNameRef.current.value.trim(),
        completed: props.taskObj.completed,
        date: props.taskObj.date,
      };
      const isSuccess = await editTask(todo, handleError)
      isSuccess ? handleCloseButton() : false;
    } else {
      setErrorCaption("Please enter name of task!");
    }
  };

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseButton()
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  });

  const ref = useClickOutside(() => {
    handleCloseButton()
  });

  if (!props.show) {
    return null;
  }

  return (
    <ModalBlock>
      <ModalContainer ref={ref}>
        {props.type === "createModal" && (
          <>
            <ModalHeader>Create task</ModalHeader>
            <ModalBody>
              <Input
                placeholder="Enter text..."
                name="enter-name-input"
                id="enter-name-input"
                ref={nameInputRef}
                autoFocus={true}
                onKeyDown={handleEnterPress}
              />
              <ErrorCaption>{errorCaption}</ErrorCaption>
              <ModalButtons>
                <ModalSaveButton onClick={handleSaveClick}>
                  Save
                </ModalSaveButton>
                <ModalCloseButton onClick={handleCloseButton}>
                  Close
                </ModalCloseButton>
              </ModalButtons>
            </ModalBody>
          </>
        )}
        {props.type === "deleteModal" && (
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
        )}
        {props.type === "editModal" && (
          <>
            <ModalHeader>Edit Task</ModalHeader>
            <ModalBody>
              <Input
                placeholder="Change name of task..."
                name="change-name-input"
                id="change-name-input"
                ref={changeNameRef}
                autoFocus={true}
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
          </>
        )}
      </ModalContainer>
    </ModalBlock>
  );
};
export { Modal };
