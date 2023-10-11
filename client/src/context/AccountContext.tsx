import { AccountContextType } from "@/types/types";
import { changeAvatar, changeUserData, getUser, getUserStatistic } from "@/utils/services/user.service";
import { useState, createContext, useCallback, useEffect } from "react";

interface Props {
    children: React.ReactNode;
}
export const AccountContext = createContext<AccountContextType | null>(null);

const AccountProvider: React.FC<Props> = ({ children }) => {
    const [isProfile, setIsProfile] = useState(true)
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userAvatar, setUserAvatar] = useState("/static/avatars/person-logo.svg")
    const [userStatisctic, setUserStatisctic] = useState<{ WeekPercant: number, AllTimePercant: number }>({ WeekPercant: 0, AllTimePercant: 0 })
    const [error, setError] = useState<{ avatarError: string, userNameError: string, userEmailError: string }>({ avatarError: "", userNameError: "", userEmailError: "" })

    const handleProfileClick = (value: boolean) => {
        setIsProfile(value)
    }

    const getUserData = useCallback(async () => {
        try {
            const userData = await getUser()
            const userStatisctic = await getUserStatistic();

            setUserName(userData.login)
            setUserEmail(userData.email)
            setUserAvatar(userData.avatar)
            setUserStatisctic({ WeekPercant: userStatisctic.WeekPercant, AllTimePercant: userStatisctic.AllTimePercant })
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        getUserData()
    }, [getUserData])

    const handleChangeAvatar = async (avatarIcon: FormData) => {
        try {
            setError({ avatarError: "", userNameError: "", userEmailError: "" })
            const res = await changeAvatar(avatarIcon)
            setUserAvatar(res)
        }
        catch (err) {
            if (err instanceof Error) {
                setError({ avatarError: err.message, userNameError: "", userEmailError: "" })
            }
        }
    }

    const handleChangeUserName = async (userData: { newLogin: string, newEmail: string }) => {
        try {
            setError({ avatarError: "", userNameError: "", userEmailError: "" })
            const res = await changeUserData(userData, 'username')
            setUserName(res)
        }
        catch (err) {
            if (err instanceof Error) {
                setError({ avatarError: "", userNameError: err.message, userEmailError: "" })
            }
        }
    }

    const handleChangeUserEmail = async (userData: { newLogin: string, newEmail: string }) => {
        try {
            setError({ avatarError: "", userNameError: "", userEmailError: "" })
            const res = await changeUserData(userData, 'email')
            setUserEmail(res)
        }
        catch (err) {
            if (err instanceof Error) {
                setError({ avatarError: "", userNameError: "", userEmailError: err.message })
            }
        }
    }

    return (
        <AccountContext.Provider
            value={{
                isProfile,
                userName,
                userEmail,
                userAvatar,
                userStatisctic,
                error,
                handleProfileClick,
                handleChangeAvatar,
                handleChangeUserName,
                handleChangeUserEmail
            }}>
            {children}
        </AccountContext.Provider>
    )
}


export default AccountProvider;