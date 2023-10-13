import { Input } from "@/styles/inputs";
import Image from "next/image";
import styled from "styled-components";

export const SearchInput = styled(Input)`
color: #6b7280;
  border: 1px solid #626060;
  outline: none;
  border-radius: 30px;
  background-color: #9333ea0f;
  width: 50%;
`

export const SearchIcon = styled(Image)`
  cursor: pointer;
`