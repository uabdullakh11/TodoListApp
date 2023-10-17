import styled from "styled-components";
export const ModalContainer = styled.div`
  padding-bottom: 10px;
  border-radius: 10px;
  background: #fff;
  @media (max-width: 400px) {
    max-width: 320px;
  }
`;
export const ModalBlock = styled.div`
  z-index: 999;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalHeader = styled.div`
  color: #9333ea;
  border-radius: 10px;
  background: linear-gradient(259.86deg, #f5edfd 0%, #feeff5 85.32%);
  padding: 10px 15px;
  font-weight: bold;
`;
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 25px;
  gap: 1rem;
`;
export const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;
const ModalButton = styled.button`
  padding: 10px 60px;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 30px;
  width: 100%;
  border: none;
  cursor: pointer;
  @media (max-width: 400px) {
    padding: 10px 40px;
    background-position-x: 10px !important;
  }
`;
export const ModalDeleteButton = styled(ModalButton)`
  background: url("../delete-icon.svg"), #f564970f;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 30px;
  background-size: 20px;
  color: #f56497;
  &:hover {
    background-color: #aaa;
    color: #f56497;
    font-weight: bold;
  }
  &:focus{
    box-shadow: 0 0 0 3px lightskyblue;
    outline: none;
  }
  &:active{
    background-color: #fff;
    color: #e41960;
  }
`;
export const ModalSaveButton = styled(ModalButton)`
  background-image: url("../save-btn-icon.svg");
  color: #67b8cb;
  &:hover {
    background-color: #aaa;
    color: #fff;
    font-weight: bold;
  }
  &:focus{
    box-shadow: 0 0 0 3px lightskyblue;
    outline: none;
  }
  &:active{
    background-color: #fff;
    color: #000;
  }
`;
export const ModalCloseButton = styled(ModalButton)`
  background-image: url("../close-btn-icon.svg");
  color: #6b7280;
  &:hover {
    background-color: #aaa;
    color: #fff;
    font-weight: bold;
  }
  &:focus{
    box-shadow: 0 0 0 3px lightskyblue;
    outline: none;
  }
  &:active{
    background-color: #fff;
    color: #000;
  }
`;
export const ModalText = styled.p`
  color: #9333ea;
  font-weight: bold;
  margin: 0;
`;