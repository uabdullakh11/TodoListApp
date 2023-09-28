// "use client";
import React, { FC } from "react";
import styled from "styled-components";
import { NavContainer, SortingContainer } from "@/styles/containers";
import { LogOutBtn } from "@/styles/buttons";
const NavBlock = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const SettingsNavPanel: FC = () => {
 
  const handleLogout = async () =>{
    
  }
  return (
    <NavBlock>
      <NavContainer>
        <SortingContainer>
          
        </SortingContainer>
        <LogOutBtn onClick={handleLogout}> Log out</LogOutBtn>
      </NavContainer>
    </NavBlock>
  );
};
export { SettingsNavPanel };
