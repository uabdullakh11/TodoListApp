"use client";
import Image from "next/image";
import React, { useState, FC } from "react";
import useModal from "../utils/hooks/useModal";
import { StatusSortingButtons } from "./StatusSortingButtons";
import { DateSortingButtons } from "./DateSortingButtons";
import { Modal } from "./Modal";
import { NavBlock } from "../css/nav-panel";
import { NavContainer, SortingContainer } from "../css/containers";
import { AddTaskBtn, AllBtn, DateBtn, TodayBtn} from "../css/buttons";


const NavPanel: FC = () => {
  const [isShowingModal, toggleModal] = useModal();

  const [isTodayClicked, setIsTodayClicked] = useState<boolean>(true);
  const [isAllClicked, setIsAllClicked] = useState<boolean>(false);
  const [isDateClicked, setIsDateClicked] = useState<boolean>(false);

  const handleTodayClick = () => {
    isTodayClicked ? setIsTodayClicked(false) : setIsTodayClicked(true);
    isAllClicked ? setIsAllClicked(false) : false;
    isDateClicked ? setIsDateClicked(false) : false;
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
          <TodayBtn active={isTodayClicked} onClick={handleTodayClick}>Today</TodayBtn>
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
