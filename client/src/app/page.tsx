"use client";
import styled from "styled-components";
import { TheTask } from "./components/TheTask";
import { TheCreateTaskModal } from "./components/TheCreateTaskModal";
import useModal from "./utils/hooks/useModal";
const CardBlock = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 466px;
  height: 312px;
`;
const Container = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function Home() {
  const [isShowingModal, toggleModal] = useModal();
  return (
    <CardBlock>
      <Container>
        <TheTask></TheTask>
      </Container>
      {/* <TheCreateTaskModal show={isShowingModal}  toggleModal={toggleModal}></TheCreateTaskModal> */}
    </CardBlock>
  );
}
