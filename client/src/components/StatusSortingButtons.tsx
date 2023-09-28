// "use client";
import React,{ useState, FC } from "react";
import { SortingButtonsContainer } from "@/styles/containers";
import { AllBtn, DoneBtn, UndoneBtn } from "@/styles/buttons";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";
import { api } from "@/utils/axios/axios";

const StatusSortingButtons:FC = () => {
  const {filterAll, filterUndone, filterDone, currentPage} = React.useContext(TasksContext) as TasksContextType;

  const [isChoosed, setIsChoosed] = useState<boolean>(false);
  const [isAllClicked, setIsAllClicked] = useState<boolean>(false);
  const [isDoneClicked, setIsDoneClicked] = useState<boolean>(false);
  const [isUndoneClicked, setIsUndoneClicked] = useState<boolean>(false);

  const handleAllClick = async () => {
    setIsChoosed(true);
    !isAllClicked ? setIsAllClicked(true) : false;
    isDoneClicked ? setIsDoneClicked(false) : false;
    isUndoneClicked ? setIsUndoneClicked(false) : false;

    // const allTodos = await api('api/todos/1?page=1');
    // console.log(allTodos.data)
    filterAll(currentPage);
  };
  const handleDoneClick = async () => {
    setIsChoosed(true);
    !isDoneClicked ? setIsDoneClicked(true) : false;
    isAllClicked ? setIsAllClicked(false) : false;
    isUndoneClicked ? setIsUndoneClicked(false) : false;

    // const doneTodos = await api('api/todos/1/done?page=1');
    // console.log(doneTodos.data)
    filterDone();
  };
  const handleUndoneClick = async () => {
    setIsChoosed(true);
    !isUndoneClicked ? setIsUndoneClicked(true) : false;
    isAllClicked ? setIsAllClicked(false) : false;
    isDoneClicked ? setIsDoneClicked(false) : false;

    // const undoneTodos = await api('api/todos/1/undone?page=1');
    // console.log(undoneTodos.data)
    filterUndone();
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
