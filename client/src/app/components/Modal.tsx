"use client";
import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { ModalBlock, ModalBody, ModalButtons, ModalHeader } from "../css/modal";
import { ModalContainer } from "../css/containers";
import { ModalInputName } from "../css/inputs";
import {
  ModalCloseButton,
  ModalDeleteButton,
  ModalSaveButton,
} from "../css/buttons";
import { ErrorCaption, ModalText } from "../css/text";
import useDate from "../utils/hooks/useDate";

interface ModalProps {
  show: boolean;
  onCloseButtonClick: () => void;
  type: string;
  taskname?: string;
}
interface TaskInterface {
  id: number;
  name: string;
  isCompleted: boolean;
  date: string;
}


const Modal = (props: ModalProps) => {
  if (!props.show) {
    return null;
  }

  const [fullDate] = useDate();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const changeNameRef = useRef<HTMLInputElement>(null);
  const [errorCaption, setErrorCaption] = useState("");

  const handleSaveClick = () => {
    if (nameInputRef.current && nameInputRef.current.value !== "") {
      const oldTasks = JSON.parse(localStorage.getItem("tasks"));
      const todo = {
        name: nameInputRef.current.value,
        isCompleted: false,
        date: fullDate,
      };
      oldTasks.push(todo);
      localStorage.setItem("tasks", JSON.stringify(oldTasks));
      props.onCloseButtonClick();
    } else {
      setErrorCaption("Please enter name of task!");
    }
  };
  const handleDeleteClick = () => {
    const oldTasks = JSON.parse(localStorage.getItem("tasks"));
    const newTasks = oldTasks.filter((item:TaskInterface) => {
      return item.name!==props.taskname;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    props.onCloseButtonClick();
  };
  const handleChangeClick = () => {
    if (changeNameRef.current && changeNameRef.current.value !== "") {
      const oldTasks = JSON.parse(localStorage.getItem("tasks"));
      const newTasks = oldTasks.map((item:TaskInterface) => {
        if (item.name === props.taskname) {
          item.name = changeNameRef.current.value;
        }
        return item;
      });
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      props.onCloseButtonClick();
    } else {
      setErrorCaption("Please enter name of task!");
    }
  };
  return ReactDOM.createPortal(
    <ModalBlock>
      {props.type === "createModal" && (
        <ModalContainer>
          <ModalHeader>Create task</ModalHeader>
          <ModalBody>
            <ModalInputName
              placeholder="Enter text..."
              name="enter-name-input"
              id="enter-name-input"
              ref={nameInputRef}
            />
            <ErrorCaption>{errorCaption}</ErrorCaption>
            <ModalButtons>
              <ModalSaveButton onClick={handleSaveClick}>Save</ModalSaveButton>
              <ModalCloseButton onClick={props.onCloseButtonClick}>
                Close
              </ModalCloseButton>
            </ModalButtons>
          </ModalBody>
        </ModalContainer>
      )}
      {props.type === "deleteModal" && (
        <ModalContainer>
          <ModalHeader>Delete Task</ModalHeader>
          <ModalBody>
            <ModalText>Are you sure about deleting this task?</ModalText>
            <ModalButtons>
              <ModalDeleteButton onClick={handleDeleteClick}>
                Delete
              </ModalDeleteButton>
              <ModalCloseButton onClick={props.onCloseButtonClick}>
                Close
              </ModalCloseButton>
            </ModalButtons>
          </ModalBody>
        </ModalContainer>
      )}
      {props.type === "editModal" && (
        <ModalContainer>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalBody>
            <ModalInputName
              placeholder="Change name of task..."
              name="change-name-input"
              id="change-name-input"
              ref={changeNameRef}
            ></ModalInputName>
            <ErrorCaption>{errorCaption}</ErrorCaption>
            <ModalButtons>
              <ModalSaveButton onClick={handleChangeClick}>
                Change
              </ModalSaveButton>
              <ModalCloseButton onClick={props.onCloseButtonClick}>
                Close
              </ModalCloseButton>
            </ModalButtons>
          </ModalBody>
        </ModalContainer>
      )}
    </ModalBlock>,
    document.body
  );
};
export { Modal };
