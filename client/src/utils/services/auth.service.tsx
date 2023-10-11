import axios from "axios";
import { axiosInstance } from "../axios/axios";
import { saveToken } from "@/helpers/token";

const login = async (userData: { login: string, password: string }) => {
    try {
        const token = await axiosInstance.post('api/auth/login', userData)
        saveToken(token.data.ACCESS_TOKEN, token.data.expires_in, token.data.REFRESH_TOKEN)
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
        saveToken(token.data.ACCESS_TOKEN, token.data.expires_in, token.data.REFRESH_TOKEN)
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

const refreshToken = async () => {
    try {
        const refresh_token = sessionStorage.getItem("REFRESH_TOKEN")
        const res = await axiosInstance.post("/api/auth/refresh", { refreshToken:refresh_token });
        saveToken(res.data.ACCESS_TOKEN, res.data.expires_in, res.data.REFRESH_TOKEN);
        return res.data
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }

}

export { login, register, refreshToken }