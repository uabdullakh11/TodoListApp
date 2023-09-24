import styled, { css } from "styled-components";
import Link from "next/link";
export const HeaderBlock = styled.header`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
`;
export const ProfileLogo = styled(Link)<{$profile: boolean}>`
${(props) =>
  props.$profile &&
  css`
    @media (max-width: 545px) {
      display: none;
    }
  `}
`;