import styled from'styled-components';
export const ModalBlock = styled.div`
  z-index: 999;
  width: 100%;
  height: 100vh;
  position: absolute;
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
