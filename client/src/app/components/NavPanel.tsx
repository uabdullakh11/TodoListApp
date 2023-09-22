"use client";
import Image from "next/image";
import React, { useState, FC } from "react";
import useModal from "../utils/hooks/useModal";
import useDate from "../utils/hooks/useDate";
import { StatusSortingButtons } from "./StatusSortingButtons";
import { DateSortingButtons } from "./DateSortingButtons";
import { Modal } from "./Modal";
import { NavBlock } from "../styles/nav-panel";
import { NavContainer, SortingContainer } from "../styles/containers";
import { AddTaskBtn, AllBtn, DateBtn, TodayBtn } from "../styles/buttons";
import { TasksArray, ITask } from "../types/types";

interface INavPanelProps {
  handleSetTasks: (value: TasksArray)=> void;
}

const NavPanel: FC = (props: INavPanelProps) => {
  const [isShowingModal, toggleModal] = useModal();
  const [, currrentDate,] = useDate();

  const [isTodayClicked, setIsTodayClicked] = useState<boolean>(false);
  const [isAllClicked, setIsAllClicked] = useState<boolean>(false);
  const [isDateClicked, setIsDateClicked] = useState<boolean>(false);

  const handleTodayClick = () => {
    isTodayClicked ? setIsTodayClicked(false) : setIsTodayClicked(true);
    isAllClicked ? setIsAllClicked(false) : false;
    isDateClicked ? setIsDateClicked(false) : false;

    const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    oldTasks.sort((a:ITask, b:ITask) =>{
      if (a.date>b.date) return 1
      else return -1
    })
    const newTasks = oldTasks.map((item: ITask) => {
      if (item.date.slice(0, 9) === currrentDate) {
        return item
      }
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    window.location.reload();
  };
  const handleAllClick = () => {
    isAllClicked ? setIsAllClicked(false) : setIsAllClicked(true);
    isTodayClicked ? setIsTodayClicked(false) : false;
    isDateClicked ? setIsDateClicked(false) : false;
  };
  const handleDateClick = () => {
    isDateClicked ? setIsDateClicked(false) : setIsDateClicked(true);
    isAllClicked ? setIsAllClicked(false) : false;
    isTodayClicked ? setIsTodayClicked(false) : false;
  };
  const handleAddTask = () => {
    toggleModal();
  };
  return (
    <NavBlock>
      <NavContainer>
        <SortingContainer>
          <TodayBtn $active={isTodayClicked} onClick={handleTodayClick}>Today</TodayBtn>
          {isAllClicked ? (
            <StatusSortingButtons />
          ) : (
            <AllBtn onClick={handleAllClick}>All</AllBtn>
          )}
          {isDateClicked ? (
            <DateSortingButtons />
          ) : (
            <DateBtn onClick={handleDateClick}>Date</DateBtn>
          )}
        </SortingContainer>
        <AddTaskBtn onClick={handleAddTask}>
          <Image src="plus-btn.svg" alt="" width={20} height={20} />
          <span>Add task</span>
        </AddTaskBtn>
      </NavContainer>
      <Modal show={isShowingModal} onCloseButtonClick={toggleModal} type="createModal"></Modal>
    </NavBlock>
  );
};
export { NavPanel };
