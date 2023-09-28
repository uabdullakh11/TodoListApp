// "use client";
import React,{ useState, FC } from "react";
import { NewBtn, PastBtn } from "@/styles/buttons";
import { SortingButtonsContainer } from "@/styles/containers";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";

const DateSortingButtons:FC = () => {
  const {filterPast, filterNew } = React.useContext(TasksContext) as TasksContextType;

  const [isChoosed, setIsChoosed] = useState<boolean>(false);
  const [isNewClicked, setIsNewClicked] = useState<boolean>(false);
  const [isPastClicked, setIsPastClicked] = useState<boolean>(false);

  const handleNewClick = async () => {
    setIsChoosed(true);
    !isNewClicked ? setIsNewClicked(true) : false;
    isPastClicked ? setIsPastClicked(false) : false;

    // const newTodos = await api("api/todos/1/new?page=1")
    // console.log(newTodos.data)
    filterNew()
  };
  const handlePastClick = async () => {
    setIsChoosed(true);
    !isPastClicked ? setIsPastClicked(true) : false;
    isNewClicked ? setIsNewClicked(false) : false;

    // const pastTodos = await api("api/todos/1/past?page=1")
    // console.log(pastTodos.data)
    filterPast()
  };
  const handleChoosedClick = () => {
    setIsChoosed(false);
  };
  return (
    <>
      {isNewClicked ? <NewBtn onClick={handleChoosedClick}>New</NewBtn> : null}
      {isPastClicked ? (
        <PastBtn onClick={handleChoosedClick}>Past</PastBtn>
      ) : null}
      {!isChoosed ? (
        <SortingButtonsContainer>
          <NewBtn onClick={handleNewClick}>New</NewBtn>
          <PastBtn onClick={handlePastClick}>Past</PastBtn>
        </SortingButtonsContainer>
      ) : null}
    </>
  );
};
export { DateSortingButtons };
