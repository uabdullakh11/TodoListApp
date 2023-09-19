"use client";
import styled from "styled-components";
import Image from "next/image";

const ModalBlock = styled.div`
  padding: 48px, 16px, 17px, 16px;
  border-radius: 10px;
`;
const ModalHeader = styled.div`
  color: #9333ea;
  background-color: #f5edfd;
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const ModalInputName = styled.input`
  color: #6b7280;
  border: 1px solid #fff;
  border-radius: 5px;
`;
const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
`;
const ModalSaveButton = styled.button`
  padding: 8px;
  border-radius: 5px;
  color: #67b8cb0f;
  background-image: url("./save-btn-icon.svg");
  background-repeat: no-repeat;
  background-position-y: center;
`;
const ModalCloseButton = styled.button`
  padding: 8px;
  border-radius: 5px;
  color: #6B72800F;
  background-image: url("./close-btn-icon.svg");
  background-repeat: no-repeat;
  background-position-y: center;
`;

const TheTask = () => {
  return (
    <ModalBlock>
      <ModalHeader>Create Task</ModalHeader>
      <ModalBody>
        <ModalInputName placeholder="Enter text..."></ModalInputName>
        <ModalButtons>
          <ModalSaveButton>Save</ModalSaveButton>
          <ModalCloseButton>Close</ModalCloseButton>
        </ModalButtons>
      </ModalBody>
    </ModalBlock>
  );
};
export { TheTask };
