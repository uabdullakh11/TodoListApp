// "use client";
import Image from "next/image";
import React, { useState, FC } from "react";
import useModal from "@/utils/hooks/useModal";
import { StatusSortingButtons } from "./StatusSortingButtons";
import { DateSortingButtons } from "./DateSortingButtons";
import { Modal } from "./Modal";
import styled from "styled-components";
import { NavContainer, SortingContainer } from "@/styles/containers";
import { AddTaskBtn, AllBtn, DateBtn, TodayBtn } from "@/styles/buttons";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";
import { api } from "@/utils/axios/axios";
// import { useClickAway } from "@uidotdev/usehooks";
const NavBlock = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
interface NavpanelProps {
  handleSetFilter:(value:string)=>void
}
// const NavPanel = (props:NavpanelProps) => {
const NavPanel = () => {
  const { handleSetFilter } = React.useContext(TasksContext) as TasksContextType;

  const [isShowingModal, toggleModal] = useModal();

  const [isTodayClicked, setIsTodayClicked] = useState<boolean>(false);
  const [isAllClicked, setIsAllClicked] = useState<boolean>(false);
  const [isDateClicked, setIsDateClicked] = useState<boolean>(false);

  const handleTodayClick = async () => {
    // isTodayClicked ? setIsTodayClicked(false) : setIsTodayClicked(true);
    setIsTodayClicked(!isTodayClicked);
    isAllClicked ? setIsAllClicked(false) : false;
    isDateClicked ? setIsDateClicked(false) : false;
    
    // const todayTodos = await api('/api/todos/1/today?page=1')
    // console.log(todayTodos.data)
    // props.handleSetFilter("today")
    handleSetFilter("today")
    // filterToday(currentPage)
  };
  const handleAllClick = () => {
    // isAllClicked ? setIsAllClicked(false) : setIsAllClicked(true);
    setIsAllClicked(!isAllClicked)
    isTodayClicked ? setIsTodayClicked(false) : false;
    isDateClicked ? setIsDateClicked(false) : false;
  };
  const handleDateClick = () => {
    // isDateClicked ? setIsDateClicked(false) : setIsDateClicked(true);
    setIsDateClicked(!isDateClicked)
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
            // <StatusSortingButtons handleSetFilter={props.handleSetFilter}/>
            <StatusSortingButtons />
          ) : (
            <AllBtn onClick={handleAllClick}>All</AllBtn>
          )}

          {isDateClicked ? (
            // <DateSortingButtons handleSetFilter={props.handleSetFilter} />
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
      <Modal show={isShowingModal} onCloseButtonClick={toggleModal} type="createModal"></Modal>
    </NavBlock>
  );
};
export { NavPanel };
