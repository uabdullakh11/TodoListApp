"use client";
import styled from "styled-components";
import ReactDOM from "react-dom";
import React,{ FC } from "react";

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
const ModalCloseButton = styled(Button)`
  background-image: url("./close-btn-icon.svg");
  color: #6b7280;
`;

interface DeleteTaskModalProps {
  show: boolean;
  onCloseButtonClick: () => void;
}

const DeleteTaskModal = (props: DeleteTaskModalProps) => {
  if (!props.show) {
    return null;
  }
  const handleDeleteClick = () => {
    localStorage.removeItem("task");
    props.onCloseButtonClick();
  };
  return ReactDOM.createPortal(
    <ModalBlock>
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
    </ModalBlock>,
    document.body
  );
};
export { DeleteTaskModal };
