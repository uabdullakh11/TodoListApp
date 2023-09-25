import styled, { css } from "styled-components";
import Link from "next/link";
export const ModalText = styled.p`
  color: #9333ea;
  font-weight: bold;
  margin: 0;
`;
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
export const TaskName = styled.span`
  color: #000000;
  word-break: break-all;
  max-width: 205px;
  display: inline-block;
  @media (max-width: 475px) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 15vw;
  }
`;
export const DataLine = styled.span`
  color: #6b7280;
  word-break: break-all;
`;
export const ErrorCaption = styled.span`
  color: #f56497;
  background-color: #f564970f;
`;
export const PaginationItem = styled.li`
  cursor: pointer;
`;
export const PaginationLink = styled.a<{ $active: boolean }>`
  ${(props) => (props.$active ? `font-weight: 700;` : ``)}
`;
// export const PaginationLink = styled.a``;
export const LinkTo = styled(Link)`
  text-decoration: none;
  align-self: flex-end;
  color: #ad89ce;
`;
export const ErrorTitle = styled.h1<{$size:number}>`
  font-size: ${(props) => (props.$size)}px;
  font-weight: 700;
  text-align: center;
  color: #9333ea;
`
