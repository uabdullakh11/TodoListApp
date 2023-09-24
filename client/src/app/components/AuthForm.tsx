"use client";
import React, { ReactElement } from "react";
import { FormContainer } from "../styles/containers";

const AuthForm = ({
    children,
  }: {
    children: ReactElement;
}) => {
    return (
        <FormContainer>
           {children}  
        </FormContainer>
    );
};
export { AuthForm };
