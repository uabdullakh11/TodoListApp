import axios from "axios";
import { axiosInstance } from "../axios/axios";

const login = async (userData: { login: string, password: string }) => {
    try {
        const token = await axiosInstance.post('api/auth/login', userData)
        sessionStorage.setItem('ACCESS_TOKEN', token.data.ACCESS_TOKEN)
        sessionStorage.setItem('expires_in', token.data.expires_in)
        sessionStorage.setItem('REFRESH_TOKEN', token.data.REFRESH_TOKEN)
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

const register = async (userData: { email: string, login: string, password: string }) => {
    try {
        const token = await axiosInstance.post('api/auth/register', userData)
        sessionStorage.setItem('ACCESS_TOKEN', token.data.ACCESS_TOKEN)
        sessionStorage.setItem('expires_in', token.data.expires_in)
        sessionStorage.setItem('REFRESH_TOKEN', token.data.REFRESH_TOKEN)
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export { login, register }