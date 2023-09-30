import React from "react";
import { HeaderBlock } from "@/styles/header";
import { HeaderContainer } from "@/styles/containers";

const Header = ({ children, }: { children: React.ReactElement; }) => {
  return (
    <HeaderBlock>
      <HeaderContainer>
        {children}
      </HeaderContainer>
    </HeaderBlock>
  );
};
export { Header };
