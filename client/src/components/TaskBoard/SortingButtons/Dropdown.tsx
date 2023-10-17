import React, { useState, FC } from "react";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";
import { SortingButtonsContainer, DateButton, StatusButton } from "./sortingButtonsStyles";
import { useClickOutside } from "@/utils/hooks/useClickOutside";

interface DropdownProps {
    type: string;
    isBurger?: {isBurger: boolean, handleSideBarClose: ()=> void};
}
const Dropdown: FC<DropdownProps> = ({ type, isBurger}) => {
    const { handleSetFilter, onPageChange } = React.useContext(TasksContext) as TasksContextType;

    const [dropdownState, setDropdownState] = useState({ open: true, option: "" });

    const handleBtnClick = (type: string) => {
        setDropdownState({ open: !dropdownState.open, option: type });
        handleSetFilter({ filter: type, currentPage: 1, search: "" })
        // onPageChange(1)

        isBurger && isBurger.handleSideBarClose();
    }

    const ref = useClickOutside(() => {
        // setDropdownState({ open: false, option: dropdownState.option });
    })

    return (
        <>
            {type === 'status' &&
                <>
                    {dropdownState.option === "all" &&
                        <StatusButton onClick={() => handleBtnClick('all')}>All</StatusButton>
                    }
                    {dropdownState.option === "done" &&
                        <StatusButton onClick={() => handleBtnClick('done')}>Done</StatusButton>
                    }
                    {dropdownState.option === "undone" &&
                        <StatusButton onClick={() => handleBtnClick('undone')}>Undone</StatusButton>
                    }
                    {dropdownState.open &&
                        <SortingButtonsContainer ref={ref}>
                            <StatusButton onClick={() => handleBtnClick('all')}>All</StatusButton>
                            <StatusButton onClick={() => handleBtnClick('done')}>Done</StatusButton>
                            <StatusButton onClick={() => handleBtnClick('undone')}>Undone</StatusButton>
                        </SortingButtonsContainer>
                    }
                </>
            }
            {type === 'date' &&
                <>
                    {dropdownState.option === "new" &&
                        <DateButton onClick={() => handleBtnClick('new')}>New</DateButton>
                    }
                    {dropdownState.option === "past" &&
                        <DateButton onClick={() => handleBtnClick('past')}>Past</DateButton>
                    }
                    {dropdownState.open &&
                        <SortingButtonsContainer ref={ref}>
                            <DateButton onClick={() => handleBtnClick('new')}>New</DateButton>
                            <DateButton onClick={() => handleBtnClick('past')}>Past</DateButton>
                        </SortingButtonsContainer>
                    }
                </>
            }
        </>
    );
};
export { Dropdown };
