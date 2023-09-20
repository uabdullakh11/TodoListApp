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
  background: linear-gradient(259.86deg, #f5edfd 0%, #feeff5 85.32%);
  padding: 10px 15px;
  font-weight: bold;
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 25px;
  gap: 1rem;
`;
const ModalText = styled.p`
  color: #9333ea;
  font-weight: bold;
  margin: 0;
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
const ModalDeleteButton = styled(Button)`
  background: url("./delete-icon.svg"), #f564970f;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 30px;
  background-size: 20px;
  color: #f56497;
`;
const ModalSaveButton = styled(Button)`
  background-image: url("./save-btn-icon.svg");
  color: #67b8cb;
`;
const ModalCloseButton = styled(Button)`
  background-image: url("./close-btn-icon.svg");
  color: #6b7280;
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

enum ModalTypes {
  createModal = "createModal",
  deleteModal = "deleteModal",
  editModal = "editModal",
}

interface ModalProps {
  show: boolean;
  onCloseButtonClick: () => void;
  type: string;
  //children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  if (!props.show) {
    return null;
  }
  const nameInputRef = useRef<HTMLInputElement>(null)
  const changeNameRef = useRef<HTMLInputElement>(null)
  
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
  const handleDeleteClick = () => {
    localStorage.removeItem("task");
    props.onCloseButtonClick();
  };
  const handleChangeClick = () => {
    props.onCloseButtonClick();
  }
  return ReactDOM.createPortal(
    <ModalBlock>
      {props.type === "createModal" && <ModalContainer>
        <ModalHeader>Create task</ModalHeader>
        <ModalBody>
        <ModalInputName placeholder="Enter text..." name="enter-name-input" id="enter-name-input" ref={nameInputRef} />
          <ModalButtons>
          <ModalSaveButton onClick={handleSaveClick}>Save</ModalSaveButton>
            <ModalCloseButton onClick={props.onCloseButtonClick}>
              Close
            </ModalCloseButton>
          </ModalButtons>
        </ModalBody>
      </ModalContainer>}
      {props.type==="deleteModal" && <ModalContainer>
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
      </ModalContainer>}
      {props.type === "editModal"  &&   <ModalContainer>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalBody>
          <ModalInputName placeholder="Enter text..." name="change-name-input" id="change-name-input" ref={changeNameRef}></ModalInputName>
          <ModalButtons>
            <ModalSaveButton onClick={handleChangeClick}>Change</ModalSaveButton>
            <ModalCloseButton onClick={props.onCloseButtonClick}>
              Close
            </ModalCloseButton>
          </ModalButtons>
        </ModalBody>
      </ModalContainer>}
      {/* <ModalContainer>
       {props.children}
       
      </ModalContainer> */}
    </ModalBlock>,
    document.body
  );
};
export { Modal };
