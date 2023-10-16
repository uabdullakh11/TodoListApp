import axios from "axios";
import { api } from "../axios/axios";
import { removeToken } from "@/helpers/token";

const changePassword = async (userNewPassword: { currentPassword: string, newPassword: string }) => {
    try {
        await api.patch('api/users/password', userNewPassword)
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

const changeUserData = async (userData: { newLogin: string, newEmail: string }, type: string) => {
    try {
        if (type === 'email') {
            const res = await api.patch(`api/users?change=${type}`, userData);
            return res.data
        }
        else {
            const res = await api.patch(`api/users?change=${type}`, userData)
            return res.data
        }
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


const changeAvatar = async (avatarIcon: FormData) => {
    try {
        const res = await api.put(`api/users/avatar`, avatarIcon)
        return res.data;
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

const getUser = async () => {
    try {
        const res = await api('/api/users/')
        return res.data[0]
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

const getUserStatistic = async () => {
    try {
        const res = await api('api/users/statistic')
        return res.data
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

const deleteUser = async () => {
    try {
        await api.delete('api/users/')
        removeToken()
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}
export { changeAvatar, changePassword, changeUserData, getUserStatistic, getUser, deleteUser }