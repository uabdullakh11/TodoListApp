import React,{ useState, FC } from "react";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";
import { AllBtn, SortingButtonsContainer, DoneBtn, UndoneBtn } from "./sortingButtonsStyles";

const StatusSortingButtons:FC = () => {
  const {handleSetFilter, onPageChange} = React.useContext(TasksContext) as TasksContextType;

  const [isChoosed, setIsChoosed] = useState<boolean>(false);
  const [isAllClicked, setIsAllClicked] = useState<boolean>(false);
  const [isDoneClicked, setIsDoneClicked] = useState<boolean>(false);
  const [isUndoneClicked, setIsUndoneClicked] = useState<boolean>(false);

  const handleAllClick = async () => {
    setIsChoosed(true);
    !isAllClicked ? setIsAllClicked(true) : false;
    isDoneClicked ? setIsDoneClicked(false) : false;
    isUndoneClicked ? setIsUndoneClicked(false) : false;

    handleSetFilter("all")
    onPageChange(1)
  };
  const handleDoneClick = async () => {
    setIsChoosed(true);
    !isDoneClicked ? setIsDoneClicked(true) : false;
    isAllClicked ? setIsAllClicked(false) : false;
    isUndoneClicked ? setIsUndoneClicked(false) : false;

    handleSetFilter("done")
    onPageChange(1)
  };
  const handleUndoneClick = async () => {
    setIsChoosed(true);
    !isUndoneClicked ? setIsUndoneClicked(true) : false;
    isAllClicked ? setIsAllClicked(false) : false;
    isDoneClicked ? setIsDoneClicked(false) : false;

    handleSetFilter("undone")
    onPageChange(1)
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
