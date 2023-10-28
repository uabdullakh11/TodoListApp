import { AccountContextType } from "@/types/types";
import { useState, createContext } from "react";

interface Props {
    children: React.ReactNode;
}
export const AccountContext = createContext<AccountContextType | null>(null);

const AccountProvider: React.FC<Props> = ({ children }) => {
    const [isProfile, setIsProfile] = useState(true)

    const handleProfileClick = (value: boolean) => {
        setIsProfile(value)
    }

    return (
        <AccountContext.Provider
            value={{
                isProfile,
                handleProfileClick,
            }}>
            {children}
        </AccountContext.Provider>
    )
}


export default AccountProvider;