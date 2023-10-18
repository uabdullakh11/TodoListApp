import { Input } from "@/styles/inputs";
import Image from "next/image";
import styled from "styled-components";

export const SearchInput = styled(Input)`
color: #6b7280;
  outline: none;
  border-radius: 30px;
  background-color: #9333ea0f;
  
`

export const SearchIcon = styled(Image)`
  cursor: pointer;
`

export const SearchContainer = styled.div`
display: flex;
flex-direction: row;
    align-items: center;
gap: 1em;
`