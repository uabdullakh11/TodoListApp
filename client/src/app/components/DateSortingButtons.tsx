"use client";
import styled from "styled-components";
import React,{ useState, FC } from "react";
const SortingButtonsContainer = styled.div`
  background-color: #9333ea0f;
  border-radius: 10px;
`;
const Button = styled.div`
  padding: 10px 30px;
  color: #9333ea;
  cursor: pointer;
  background: url("./clicked-arrows.svg");
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  border-radius: 10px;
  padding-right: 70px;
  padding-left: 35px;
`;
const NewBtn = styled(Button)``;
const PastBtn = styled(Button)``;
const NewBtnClicked = styled(Button)`
  background-color: #9333ea0f;
`;
const PastBtnClicked = styled(Button)`
  background-color: #9333ea0f;
`;

const DateSortingButtons:FC = () => {
  const [isChoosed, setIsChoosed] = useState<boolean>(false);
  const [isNewClicked, setIsNewClicked] = useState<boolean>(false);
  const [isPastClicked, setIsPastClicked] = useState<boolean>(false);
  const handleNewClick = () => {
    setIsChoosed(true);
    !isNewClicked ? setIsNewClicked(true) : false;
    isPastClicked ? setIsPastClicked(false) : false;
  };
  const handlePastClick = () => {
    setIsChoosed(true);
    !isPastClicked ? setIsPastClicked(true) : false;
    isNewClicked ? setIsNewClicked(false) : false;
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
