import Image from "next/image";
import React, { useState, FC } from "react";
import useModal from "@/utils/hooks/useModal";
import { StatusSortingButtons } from "../SortingButtons/StatusSortingButtons";
import { DateSortingButtons } from "../SortingButtons/DateSortingButtons";
import { Modal } from "../../Modal/Modal";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";
import { SortingContainer, AddTaskBtn, AllBtn, DateBtn, TodayBtn } from "./navPanelStyles";
import { NavBlock, NavContainer } from "@/styles/containers";

const NavPanel: FC = () => {
  const { handleSetFilter, onPageChange } = React.useContext(TasksContext) as TasksContextType;

  const [isShowingModal, toggleModal] = useModal();

  const [isTodayClicked, setIsTodayClicked] = useState<boolean>(false);
  const [isAllClicked, setIsAllClicked] = useState<boolean>(false);
  const [isDateClicked, setIsDateClicked] = useState<boolean>(false);

  const handleTodayClick = async () => {
    setIsTodayClicked(!isTodayClicked);
    isAllClicked ? setIsAllClicked(false) : false;
    isDateClicked ? setIsDateClicked(false) : false;

    handleSetFilter("today")
    onPageChange(1)
  };
  const handleAllClick = () => {
    setIsAllClicked(!isAllClicked)
    isTodayClicked ? setIsTodayClicked(false) : false;
    isDateClicked ? setIsDateClicked(false) : false;
  };
  const handleDateClick = () => {
    setIsDateClicked(!isDateClicked)
    isAllClicked ? setIsAllClicked(false) : false;
    isTodayClicked ? setIsTodayClicked(false) : false;
  };
  const handleAddTask = () => {
    toggleModal(true);
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
          <Image src="../plus-btn.svg" alt="" width={20} height={20} />
          <span>Add task</span>
        </AddTaskBtn>
      </NavContainer>
      <Modal show={isShowingModal} onCloseButtonClick={toggleModal} type="createModal" taskObj={{ completed: false, id: "1", title: "title", date: "date" }}></Modal>
    </NavBlock>
  );
};
export { NavPanel };
