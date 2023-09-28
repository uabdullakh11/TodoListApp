// "use client";
import React, { useRef, useState } from "react";
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
import { api } from "@/utils/axios/axios";
// import { useClickAway } from "@uidotdev/usehooks";

interface ModalProps {
  show: boolean;
  type: string;
  taskId?: number;
  onCloseButtonClick: () => void;
}

const Modal = (props: ModalProps) => {
  const { saveTodo, deleteTodo, editTodo } = React.useContext(
    TasksContext
  ) as TasksContextType;

  const { fullDate } = getDate();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const changeNameRef = useRef<HTMLInputElement>(null);
  // const containerRef = useClickAway(() => {
  //   props.onCloseButtonClick()
  // });

  const [errorCaption, setErrorCaption] = useState("");

  if (!props.show) {
    return null;
  }

  const handleSaveClick = async () => {
    if (nameInputRef.current) {
      const todo = {
        title: nameInputRef.current.value,
        completed: false,
        date: fullDate,
        userId: 1,
        id: 1
      };
      // const newTodo = await api.post("api/todos/", todo);
      // console.log(newTodo.data);
      saveTodo(todo)
      props.onCloseButtonClick();
    } else {
      setErrorCaption("Please enter name of task!");
    }
  };
  const handleDeleteClick = async () => {
    if (props.taskId) {
      deleteTodo(props.taskId)
      // const id = {
      //   id: props.taskId,
      // };
      // const deleteTodo = await api.delete("api/todos/1", {
      //   data: id,
      // });
      // console.log(deleteTodo);
      props.onCloseButtonClick();
    }
  };
  const handleChangeClick = async () => {
    if (changeNameRef.current && props.taskId) {
      // editTodo(props.taskId, changeNameRef.current.value, fullDate);
      // const todo = {
      //   id:props.taskId,
      //   title: changeNameRef.current.value,
      //   date: fullDate,
      // }
      // const editTodo = await api.put("api/todos/1?update=title", todo);
      // console.log(editTodo);
      editTodo(props.taskId, changeNameRef.current.value, fullDate)
      props.onCloseButtonClick();
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
              <Input
                placeholder="Enter text..."
                name="enter-name-input"
                id="enter-name-input"
                ref={nameInputRef}
              />
              <ErrorCaption>{errorCaption}</ErrorCaption>
              <ModalButtons>
                <ModalSaveButton onClick={handleSaveClick}>
                  Save
                </ModalSaveButton>
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
              <Input
                placeholder="Change name of task..."
                name="change-name-input"
                id="change-name-input"
                ref={changeNameRef}
              />
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
  );
};
export { Modal };
