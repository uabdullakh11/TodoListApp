// "use client";
import React,{ useState, FC } from "react";
import { SortingButtonsContainer } from "@/styles/containers";
import { AllBtn, DoneBtn, UndoneBtn } from "@/styles/buttons";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";

const StatusSortingButtons:FC = () => {
  const {filterAll, filterUndone, filterDone} = React.useContext(TasksContext) as TasksContextType;

  const [isChoosed, setIsChoosed] = useState<boolean>(false);
  const [isAllClicked, setIsAllClicked] = useState<boolean>(false);
  const [isDoneClicked, setIsDoneClicked] = useState<boolean>(false);
  const [isUndoneClicked, setIsUndoneClicked] = useState<boolean>(false);

  const handleAllClick = () => {
    setIsChoosed(true);
    !isAllClicked ? setIsAllClicked(true) : false;
    isDoneClicked ? setIsDoneClicked(false) : false;
    isUndoneClicked ? setIsUndoneClicked(false) : false;
    
    filterAll();
  };
  const handleDoneClick = () => {
    setIsChoosed(true);
    !isDoneClicked ? setIsDoneClicked(true) : false;
    isAllClicked ? setIsAllClicked(false) : false;
    isUndoneClicked ? setIsUndoneClicked(false) : false;

    filterDone();
  };
  const handleUndoneClick = () => {
    setIsChoosed(true);
    !isUndoneClicked ? setIsUndoneClicked(true) : false;
    isAllClicked ? setIsAllClicked(false) : false;
    isDoneClicked ? setIsDoneClicked(false) : false;

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
