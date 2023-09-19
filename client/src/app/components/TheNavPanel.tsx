"use client";
import styled from "styled-components";
import Image from "next/image";
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
`;
const TodayBtn = styled(Button)`
  background-image: url("./today-logo.svg");
  background-repeat: no-repeat;
  background-position-y: center;
`;
const AllBtn = styled(Button)`
  background-image: url("./not-clicked-done-circle.svg");
  background-repeat: no-repeat;
  background-position-y: center;
`;
const DateBtn = styled(Button)`
  background-image: url("./arrows 1.svg");
  background-repeat: no-repeat;
  background-position-y: center;
`;
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
  return (
    <NavBlock>
      <NavContainer>
        <SortingContainer>
          <TodayBtn>Today</TodayBtn>
          <AllBtn>All</AllBtn>
          <DateBtn>Date</DateBtn>
        </SortingContainer>
        <AddTaskBtn>
          <Image src="plus-btn.svg" alt="" width={20} height={20}></Image>
          <span>Add task</span>
        </AddTaskBtn>
      </NavContainer>
    </NavBlock>
  );
};
export { TheNavPanel };
