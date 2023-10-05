import axios from "axios";
import { api } from "../axios/axios";
import { ITask } from "@/types/types";

const getTasks = async (type: string, currentPage: number) => {
    try {
        const todos = await api(`/api/todos?page=${currentPage}&filter=${type}`);
        return todos.data;
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

const addTodo = async (newTodo: { title: string, completed: boolean, date: string }) => {
    try {
        await api.post("/api/todos", newTodo);
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

const deleteTodo = async (id: number) => {
    try {
        await api.delete(`api/todos/${id}`);
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

const updateTodo = async (type: string, todo: ITask) => {
    try {
        await api.put(`api/todos?update=${type}`, todo)
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export { getTasks, addTodo, deleteTodo, updateTodo }