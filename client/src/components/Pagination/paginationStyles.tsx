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
export const PaginationItem = styled.li`
  cursor: pointer;
`;
export const PaginationLink = styled.a<{ $active: boolean }>`
  ${(props) => (props.$active ? `font-weight: 700;` : ``)}
`;