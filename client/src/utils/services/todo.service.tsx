import axios from "axios";
import { api } from "../axios/axios";
import { ITask } from "@/types/types";

const getTasks = async (filter: { filter: string, currentPage: number, search: string }) => {
    try {
        const todos = await api(`/api/todos?page=${filter.currentPage}&filter=${filter.filter}&search=${filter.search}`);
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

const deleteTodo = async (id: string) => {
    try {
        await api.delete(`api/todos/${id}`);
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

const updateTodo = async (todo: ITask) => {
    try {
        await api.put(`api/todos`, todo)
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export { getTasks, addTodo, deleteTodo, updateTodo }