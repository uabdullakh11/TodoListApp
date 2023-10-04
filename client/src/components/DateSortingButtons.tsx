import React,{ useState, FC } from "react";
import { NewBtn, PastBtn } from "@/styles/buttons";
import { SortingButtonsContainer } from "@/styles/containers";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";

const DateSortingButtons:FC = () => {
  const {handleSetFilter, onPageChange} = React.useContext(TasksContext) as TasksContextType;

  const [isChoosed, setIsChoosed] = useState<boolean>(false);
  const [isNewClicked, setIsNewClicked] = useState<boolean>(false);
  const [isPastClicked, setIsPastClicked] = useState<boolean>(false);

  const handleNewClick = async () => {
    setIsChoosed(true);
    !isNewClicked ? setIsNewClicked(true) : false;
    isPastClicked ? setIsPastClicked(false) : false;

    handleSetFilter("new")
    onPageChange(1)
  };
  const handlePastClick = async () => {
    setIsChoosed(true);
    !isPastClicked ? setIsPastClicked(true) : false;
    isNewClicked ? setIsNewClicked(false) : false;

    handleSetFilter("past")
    onPageChange(1)
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
