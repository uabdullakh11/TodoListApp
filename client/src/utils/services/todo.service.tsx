import axios from "axios";
import { api } from "../axios/axios";
import { ITask } from "@/types/types";

const getTasks = async (currentPage: number, type: string="", order:string="", search:string="") => {
    try {
        const todos = await api(`/api/todos?page=${currentPage}&filter=${type}&order=${order}&search=${search}`);
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