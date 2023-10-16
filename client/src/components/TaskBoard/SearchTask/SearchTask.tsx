import React, { FC, useState } from "react";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";
import { SearchContainer, SearchIcon, SearchInput } from "./searchTaskStyles";
import { useDebouncedCallback } from 'use-debounce';
import { useClickOutside } from "@/utils/hooks/useClickOutside";

const SearchTask: FC = () => {
    const { searchTask } = React.useContext(TasksContext) as TasksContextType;

    const [searchClick, setSearchClicked] = useState(false)

    const handleInput = useDebouncedCallback((e: React.FormEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement
        searchTask(element.value);
    }, 1000)

    const ref = useClickOutside(() => {
        setSearchClicked(false)
    })

    return (
        <SearchContainer ref={ref}>
            {searchClick &&
                <SearchInput
                    onInput={(e) => handleInput(e)}
                >
                </SearchInput>
            }
            <SearchIcon
                src="search-svgrepo-com.svg"
                alt=""
                width={30}
                height={30}
                onClick={() => setSearchClicked(!searchClick)}
            ></SearchIcon>
        </SearchContainer>
        // <SearchIcon></SearchIcon>

    );
};
export { SearchTask };
