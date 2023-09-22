"use client";
import React, { useRef, useState } from "react";
import { ModalBlock, ModalBody, ModalButtons, ModalHeader } from "../styles/modal";
import { ModalContainer } from "../styles/containers";
import { ModalInputName } from "../styles/inputs";
import {
  ModalCloseButton,
  ModalDeleteButton,
  ModalSaveButton,
} from "../styles/buttons";
import { ErrorCaption, ModalText } from "../styles/text";
import useDate from "../utils/hooks/useDate";
import { ITask } from "../types/types";

interface ModalProps {
  show: boolean;
  type: string;
  taskname?: string;
  onCloseButtonClick: () => void;
}


const Modal = (props: ModalProps) => {
  const [fullDate,,] = useDate();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const changeNameRef = useRef<HTMLInputElement>(null);

  const [errorCaption, setErrorCaption] = useState("");
  
  if (!props.show) {
    return null;
  }

  const handleSaveClick = () => {
    if (nameInputRef.current && nameInputRef.current.value !== "") {
      const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const todo = {
        name: nameInputRef.current.value,
        isCompleted: false,
        date: fullDate,
      };
      oldTasks.push(todo);
      localStorage.setItem("tasks", JSON.stringify(oldTasks));
      props.onCloseButtonClick();
      window.location.reload();
    } else {
      setErrorCaption("Please enter name of task!");
    }
  };
  const handleDeleteClick = () => {
    const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTasks = oldTasks.filter((item:ITask) => {
      return item.name!==props.taskname;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    props.onCloseButtonClick();
    window.location.reload();
  };
  const handleChangeClick = () => {
    if (changeNameRef.current && changeNameRef.current.value !== "") {
      const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const newTasks = oldTasks.map((item:ITask) => {
        if (item.name === props.taskname) {
          [item.name, item.date] = [changeNameRef.current!.value, fullDate]
        }
        return item;
      });
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      props.onCloseButtonClick();
      window.location.reload();
    } else {
      setErrorCaption("Please enter name of task!");
    }
  };

  return (
    <ModalBlock>
       <ModalContainer>
      {props.type === "createModal" && (
        <>
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
              <ModalCloseButton onClick={props.onCloseButtonClick}>
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
        </>
      )}
      </ModalContainer>
    </ModalBlock>
    //,
    //document.body
  );
};
export { Modal };
