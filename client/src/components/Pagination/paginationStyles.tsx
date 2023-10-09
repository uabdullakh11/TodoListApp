import styled from "styled-components";
export const PaginationList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 1em;
`;
export const PaginationItem = styled.li<{ $active: boolean }>`
  cursor: pointer;
  ${(props) => (props.$active && `border: 2px solid #9333ea;`)}
`;
export const PaginationLink = styled.a<{ $active: boolean }>`
  ${(props) => (props.$active &&
    `font-weight: 700;
    color:#9333ea;
    padding: 5px;
  ` )}
`;