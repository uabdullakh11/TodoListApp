"use client";
import styled from "styled-components";
import Image from "next/image";
import { useRef, useState } from "react";
const NavBlock = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
`;
const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8rem;
`;
const SortingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const Button = styled.div`
  padding: 10px 30px;
  color: #6b7280;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 10px;
  padding-right: 70px;
  padding-left: 35px;
`;
const TodayBtn = styled(Button)`
  background-image: url("./today-logo.svg");
`;
const TodayBtnClicked = styled(Button)`
background: url("./today-clicked-icon.svg"), #9333EA0F;
background-repeat: no-repeat;
background-position-y: center;
background-position-x: 10px;
color: #9333EA;
border-radius: 10px;
`
const AllBtn = styled(Button)`
  background-image: url("./not-clicked-done-circle.svg");
`;
const AllBtnClicked = styled(Button)`
background: url("./clicked-done-circle.svg"), #9333EA0F;
background-repeat: no-repeat;
background-position-y: center;
background-position-x: 10px;
color: #9333EA;
border-radius: 10px;
`
const DateBtn = styled(Button)`
  background-image: url("./arrows 1.svg");
`;
const DateBtnClicked = styled(Button)`
background-image: url("./clicked-arrows.svg");
`
const AddTaskBtn = styled.button`
  background: #9333ea0f;
  border-radius: 10px;
  outline: none;
  border: none;
  color: #9333ea;
  padding: 10px 30px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
`;
const TheNavPanel = () => {
  const [isTodayClicked, setIsTodayClicked] = useState<boolean>(false)
  const [isAllClicked, setIsAllClicked] = useState<boolean>(false)
  const handleTodayClick = (e: any) => {
    isAllClicked ? setIsAllClicked(false) :false;
    isTodayClicked ? setIsTodayClicked(false) : setIsTodayClicked(true);
  }
  const handleAllClick = (e: any) => {
    isTodayClicked ? setIsTodayClicked(false) : false;
    isAllClicked ? setIsAllClicked(false) : setIsAllClicked(true);
  }
  const handleAddTask = (e: any)=>{
    
  }
  return (
    <NavBlock>
      <NavContainer>
        <SortingContainer>
          {isTodayClicked ? <TodayBtnClicked onClick={handleTodayClick}>
            Today
          </TodayBtnClicked>
            : <TodayBtn onClick={handleTodayClick}>
              Today
            </TodayBtn>
          }
          {isAllClicked ? <AllBtnClicked onClick={handleAllClick}>
            All
          </AllBtnClicked>
            : <AllBtn onClick={handleAllClick}>
              All
            </AllBtn>
          }
          {/* <AllBtn>All</AllBtn> */}
          <DateBtn>Date</DateBtn>
        </SortingContainer>
        <AddTaskBtn onClick={handleAddTask}>
          <Image src="plus-btn.svg" alt="" width={20} height={20} />
          <span>Add task</span>
        </AddTaskBtn>
      </NavContainer>
    </NavBlock>
  );
};
export { TheNavPanel };
