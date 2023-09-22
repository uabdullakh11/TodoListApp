"use client";
import React,{ useState, FC } from "react";
import { NewBtn, PastBtn } from "../styles/buttons";
import { SortingButtonsContainer } from "../styles/containers";
import useDate from "../utils/hooks/useDate";
import { ITask } from "../types/types";


const DateSortingButtons:FC = () => {
  const [,currentDate,] = useDate()

  const [isChoosed, setIsChoosed] = useState<boolean>(false);
  const [isNewClicked, setIsNewClicked] = useState<boolean>(false);
  const [isPastClicked, setIsPastClicked] = useState<boolean>(false);

  const handleNewClick = () => {
    setIsChoosed(true);
    !isNewClicked ? setIsNewClicked(true) : false;
    isPastClicked ? setIsPastClicked(false) : false;

    const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    oldTasks.sort((a:ITask, b:ITask) =>{
      if (a.date<b.date) return 1
      else return -1
    })
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
    window.location.reload();
  };
  const handlePastClick = () => {
    setIsChoosed(true);
    !isPastClicked ? setIsPastClicked(true) : false;
    isNewClicked ? setIsNewClicked(false) : false;

    const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    oldTasks.sort((a:ITask, b:ITask) =>{
      if (a.date>b.date) return 1
      else return -1
    })
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
    window.location.reload();
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
