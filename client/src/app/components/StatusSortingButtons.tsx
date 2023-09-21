"use client";
import styled from "styled-components";
import React,{ useState, FC } from "react";
import { SortingButtonsContainer } from "../styles/containers";
import { AllBtn } from "../styles/buttons";

const Button = styled.div`
  padding: 10px 30px;
  color: #9333ea;
  cursor: pointer;
  background: url("./clicked-done-circle.svg");
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  border-radius: 10px;
  padding-right: 70px;
  padding-left: 35px;
`;
const DoneBtn = styled(Button)``;
const UndoneBtn = styled(Button)``;

interface TaskInterface {
  id: number;
  name: string;
  isCompleted: boolean;
  date: string;
}

const StatusSortingButtons:FC = () => {
  const [isChoosed, setIsChoosed] = useState<boolean>(false);
  const [isAllClicked, setIsAllClicked] = useState<boolean>(false);
  const [isDoneClicked, setIsDoneClicked] = useState<boolean>(false);
  const [isUndoneClicked, setIsUndoneClicked] = useState<boolean>(false);
  const handleAllClick = () => {
    setIsChoosed(true);
    !isAllClicked ? setIsAllClicked(true) : false;
    isDoneClicked ? setIsDoneClicked(false) : false;
    isUndoneClicked ? setIsUndoneClicked(false) : false;

    
    const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
    
  };
  const handleDoneClick = () => {
    setIsChoosed(true);
    !isDoneClicked ? setIsDoneClicked(true) : false;
    isAllClicked ? setIsAllClicked(false) : false;
    isUndoneClicked ? setIsUndoneClicked(false) : false;


    const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTasks = oldTasks.filter((item:TaskInterface) => {
      if (item.isCompleted) {
        return item;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  const handleUndoneClick = () => {
    setIsChoosed(true);
    !isUndoneClicked ? setIsUndoneClicked(true) : false;
    isAllClicked ? setIsAllClicked(false) : false;
    isDoneClicked ? setIsDoneClicked(false) : false;


    const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTasks = oldTasks.filter((item:TaskInterface) => {
      if (item.isCompleted===false) {
        return item;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  const handleChoosedClick = () => {
    setIsChoosed(false);
  };
  return (
    <>
      {isAllClicked ? <AllBtn $active={true} onClick={handleChoosedClick}>All</AllBtn> : null}
      {isDoneClicked ? (
        <DoneBtn onClick={handleChoosedClick}>Done</DoneBtn>
      ) : null}
      {isUndoneClicked ? (
        <UndoneBtn onClick={handleChoosedClick}>Undone</UndoneBtn>
      ) : null}
      {!isChoosed ? (
        <SortingButtonsContainer>
          <AllBtn $active={true} onClick={handleAllClick}>All</AllBtn>
          <DoneBtn onClick={handleDoneClick}>Done</DoneBtn>
          <UndoneBtn onClick={handleUndoneClick}>Undone</UndoneBtn>
        </SortingButtonsContainer>
      ) : null}
    </>
  );
};
export { StatusSortingButtons };
