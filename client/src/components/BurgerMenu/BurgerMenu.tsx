import React, { useState } from "react";
import { BackToHome, BurgerMenuContainer, Icon, MenuLabel, SideBar } from "./BurgerMenuStyles";
import { SettingsNavPanel } from "../UserComponents/SettingNavPanel/SettingsNavPanel";
import { NavPanel } from "../TaskBoard/NavPanel/NavPanel";
import { useClickOutside } from "@/utils/hooks/useClickOutside";


export const BurgerMenu = (props: { type: string }) => {

    const [click, setClick] = useState(false);
    const handleMenuClick = () => setClick(!click);

    const ref = useClickOutside(() => {
        setClick(false)
    })

    const handleSideBarClose = () =>{
        setClick(false)
    }

    return (
        <BurgerMenuContainer ref={ref}>
            <MenuLabel onClick={handleMenuClick}>
                <Icon $clicked={click}></Icon>
            </MenuLabel>
            {click &&
                <SideBar>
                    {props.type == "tasks" && <NavPanel isBurger={{isBurger: true, handleSideBarClose}} />}
                    {props.type == "account" &&
                        <>
                            <BackToHome href="tasks">&#129044; Back</BackToHome>
                            <SettingsNavPanel handleClick={handleMenuClick} isBurger={{isBurger: true, handleSideBarClose}}></SettingsNavPanel>
                        </>}
                </SideBar>
            }
        </BurgerMenuContainer>
    );
}