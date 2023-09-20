"use client";
import styled from "styled-components";
import ReactDOM from "react-dom";
import React,{useRef} from "react";

const ModalBlock = styled.div`
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.div`
  padding-botttom: 10px;
  border-radius: 10px;
  background: #fff;
  font-family: "Roboto", sans-serif;
`;
const ModalHeader = styled.div`
  color: #9333ea;
  border-radius: 10px;
  background: linear-gradient(259.86deg, #F5EDFD 0%, #FEEFF5 85.32%);
  padding: 10px 15px;
  font-weight: bold;
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 25px;
  gap: 1rem;
`;
const ModalInputName = styled.input`
  color: #6b7280;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #f3f3f3;
  text-indent: 0.5em;
  padding: 5px 0px;
`;
const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;
const Button = styled.button`
  padding: 10px 60px;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 30px;
  width: 100%;
  border: none;
`;
const ModalSaveButton = styled(Button)`
  background-image: url("./save-btn-icon.svg");
  color: #67b8cb;
`;
const ModalCloseButton = styled(Button)`
  background-image: url("./close-btn-icon.svg");
  color: #6b7280;
`;

interface CreateTaskModalProps {
  show: boolean;
  onCloseButtonClick: () => void;
}

const CreateTaskModal = (props: CreateTaskModalProps) => {
  if (!props.show) {
    return null;
  }
  const nameInputRef = useRef<HTMLInputElement>(null)
  const handleSaveClick = () => {
    if (nameInputRef.current) {
      const obj = {
        name: nameInputRef.current.value,
        isCompleted: false,
        date:"Today, 18:30"
      }
      // localStorage.setItem("tasks", JSON.stringify(obj));
      localStorage.setItem("tasks", nameInputRef.current.value);
    }
    props.onCloseButtonClick();
  };
  return ReactDOM.createPortal(
    <ModalBlock>
      <ModalContainer>
        <ModalHeader>Create Task</ModalHeader>
        <ModalBody>
          <ModalInputName placeholder="Enter text..." name="enter-name-input" id="enter-name-input" ref={nameInputRef}></ModalInputName>
          <ModalButtons>
            <ModalSaveButton onClick={handleSaveClick}>Save</ModalSaveButton>
            <ModalCloseButton onClick={props.onCloseButtonClick}>
              Close
            </ModalCloseButton>
          </ModalButtons>
        </ModalBody>
      </ModalContainer>
    </ModalBlock>,
    document.body
  );
};
export { CreateTaskModal };
