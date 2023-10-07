import styled, { css } from "styled-components";
import Link from "next/link";

export const LogoTitle = styled.div<{ $auth?: boolean }>`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: #9333ea;
  ${(props) =>
    props.$auth &&
    css`
      @media (max-width: 545px) {
        display: none;
      }
    `}
`;
export const FormTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: #9333ea;
`;
const Name = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #9333ea;
`;
export const PageName = styled(Name)`
  flex-grow: 1;
`;
export const Username = styled(Name)`
  @media (max-width: 545px) {
    display: none;
  }
`;

export const ErrorCaption = styled.span`
  color: #f56497;
  background-color: #f564970f;
`;

// export const PaginationLink = styled.a``;
export const LinkTo = styled(Link)`
  text-decoration: none;
  align-self: flex-end;
  color: #ad89ce;
`;
export const ErrorTitle = styled.h1<{ $size: number }>`
  font-size: ${(props) => props.$size}px;
  font-weight: 700;
  text-align: center;
  color: #9333ea;
`;

