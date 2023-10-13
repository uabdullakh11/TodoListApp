import Image from "next/image";
import React, { useState, FC } from "react";
import useModal from "@/utils/hooks/useModal";
import { Modal } from "../../Modal/Modal";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";
import { SortingContainer, AddTaskBtn, SortButton } from "./navPanelStyles";
import { NavBlock, NavContainer } from "@/styles/containers";
import { Dropdown } from "../SortingButtons/Dropdown";
import getDate from "@/helpers/getDate";
import { ModalBody, ModalButtons, ModalCloseButton, ModalHeader, ModalSaveButton } from "@/components/Modal/modalStyles";
import { Input } from "@/styles/inputs";
import { ErrorCaption } from "@/styles/text";

interface NavPanelProps {
  isBurger?: { isBurger: boolean, handleSideBarClose: () => void };
}
const NavPanel: FC<NavPanelProps> = ({ isBurger }) => {
  const { handleSetFilter, onPageChange, addTask } = React.useContext(TasksContext) as TasksContextType;

  const { fullDate } = getDate();

  const [isShowingModal, toggleModal] = useModal();
  const [isBtnClicked, setIsBtnClicked] = useState("today")
  const [title, setTitle] = useState("")
  const [errorCaption, setErrorCaption] = useState("");

  const handleBtnClick = (type: string) => {
    setIsBtnClicked(type)
    if (type === 'today') {
      handleSetFilter(type)
      onPageChange(1)
      isBurger && isBurger.handleSideBarClose();
    }
  }

  const handleError = (error: string) => {
    setErrorCaption(error)
  }

  const handleCloseButton = () => {
    toggleModal(false)
    setErrorCaption("");
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement
      target.id === "enter-name-input" && handleSaveClick();
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    setTitle(element.value)
  }

  const handleSaveClick = async () => {
    if (title.trim()) {
      const todo = {
        title: title.trim(),
        completed: false,
        date: fullDate,
      };
      try {
        const isSuccess = await addTask(todo, handleError)
        isSuccess ? handleCloseButton() : false;
        // error.createError=="" ? handleCloseButton() : setErrorCaption(error.createError);
      }
      catch (err) {
        console.log(err)
      }
    } else {
      setErrorCaption("Please enter name of task!");
    }
  };


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
        <AddTaskBtn onClick={() => toggleModal(true)}>
          <Image src="../plus-btn.svg" alt="" width={20} height={20} />
          <span>Add task</span>
        </AddTaskBtn>
      </NavContainer>
      <Modal
        show={isShowingModal}
        onCloseButtonClick={toggleModal}
      >
        <>
          <ModalHeader>Create task</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Enter text..."
              name="enter-name-input"
              id="enter-name-input"
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
              autoFocus={true}
            />
            <ErrorCaption>{errorCaption}</ErrorCaption>
            <ModalButtons>
              <ModalSaveButton onClick={handleSaveClick}>
                Save
              </ModalSaveButton>
              <ModalCloseButton onClick={handleCloseButton}>
                Close
              </ModalCloseButton>
            </ModalButtons>
          </ModalBody>
        </>
      </Modal>
    </NavBlock >
  );
};
export { NavPanel };
