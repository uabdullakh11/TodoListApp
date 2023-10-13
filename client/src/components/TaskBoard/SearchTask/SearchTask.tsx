import React, { FC, useState } from "react";
import { TasksContextType } from "@/types/types";
import { TasksContext } from "@/context/TasksContext";
import { SearchIcon, SearchInput } from "./searchTaskStyles";

const SearchTask: FC = () => {
    const { searchTask } = React.useContext(TasksContext) as TasksContextType;

    const [searchClick, setSearchClicked] = useState(false)
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement
        searchTask(element.value)
    }

    return (
        <>
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
        </>
        // <SearchIcon></SearchIcon>

    );
};
export { SearchTask };
