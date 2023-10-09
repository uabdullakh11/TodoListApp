import React, { useState } from "react";
import { BackToHome, BurgerMenuContainer, Icon, MenuLabel, SideBar } from "./BurgerMenuStyles";
import { SettingsNavPanel } from "../UserComponents/SettingNavPanel/SettingsNavPanel";
import { NavPanel } from "../TaskBoard/NavPanel/NavPanel";
import { useClickOutside } from "@/utils/hooks/useClickOutside";


export const BurgerMenu = (props: { type: string }) => {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const ref = useClickOutside(() => {
        setClick(false)
    })

    return (
        <BurgerMenuContainer ref={ref}>
            <MenuLabel onClick={handleClick}>
                <Icon $clicked={click}></Icon>
            </MenuLabel>
            {click &&
                <SideBar>
                    {props.type == "tasks" && <NavPanel isBurger={true} />}
                    {props.type == "account" &&
                        <>
                            <BackToHome href="tasks">&#129044; Back</BackToHome>
                            <SettingsNavPanel handleClick={handleClick} isBurger={true}></SettingsNavPanel>
                        </>}
                </SideBar>
            }
        </BurgerMenuContainer>
    );
}