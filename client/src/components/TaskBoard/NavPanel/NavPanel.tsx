import Image from "next/image";
import React, { useState, FC } from "react";
import useModal from "@/utils/hooks/useModal";
import { Modal } from "../../Modal/Modal";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";
import { SortingContainer, AddTaskBtn, SortButton } from "./navPanelStyles";
import { NavBlock, NavContainer } from "@/styles/containers";
import { Dropdown } from "../SortingButtons/Dropdown";

interface NavPanelProps {
  // isBurger?: boolean;
  // handleSideBarClose?: ()=> void;
  isBurger?: { isBurger: boolean, handleSideBarClose: () => void };
}
const NavPanel: FC<NavPanelProps> = ({ isBurger }) => {
  const { handleSetFilter, onPageChange } = React.useContext(TasksContext) as TasksContextType;

  const [isShowingModal, toggleModal] = useModal();

  const handleAddTask = () => {
    toggleModal(true);
  };

  const [isBtnClicked, setIsBtnClicked] = useState("today")

  const handleBtnClick = (type: string) => {
    setIsBtnClicked(type)
    if (type === 'today') {
      handleSetFilter(type)
      onPageChange(1)
      isBurger && isBurger.handleSideBarClose();
    }
  }

  return (
    <NavBlock>
      <NavContainer $isBurger={isBurger?.isBurger}>
        <SortingContainer>
          <SortButton $button={'today'} onClick={() => handleBtnClick("today")}>Today</SortButton>
          {isBtnClicked === 'all' ?
            <Dropdown type="status" isBurger={isBurger} />
            :
            <SortButton $button={'all'} onClick={() => handleBtnClick("all")}>All</SortButton>
          }
          {isBtnClicked === "date" ?
            <Dropdown type="date" isBurger={isBurger} />
            :
            <SortButton $button={'date'} onClick={() => handleBtnClick("date")}>Date</SortButton>
          }
        </SortingContainer>
        <AddTaskBtn onClick={handleAddTask}>
          <Image src="../plus-btn.svg" alt="" width={20} height={20} />
          <span>Add task</span>
        </AddTaskBtn>
      </NavContainer>
      <Modal
        show={isShowingModal}
        onCloseButtonClick={toggleModal}
        type="createModal"
        taskObj={{ completed: false, id: "1", title: "title", date: "date" }}></Modal>
    </NavBlock>
  );
};
export { NavPanel };
