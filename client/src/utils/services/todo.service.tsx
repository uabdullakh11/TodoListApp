import axios from "axios";
import { api } from "../axios/axios";

const getTasks = async (type: string, currentPage: number) => {
    try {
        const todos = await api(`/api/todos?page=${currentPage}&filter=${type}`);
        return todos.data;
    }
    catch (error){
        if (axios.isAxiosError(error) && error.response) {
            throw new Error;
        }
    }
}

export {getTasks}