import { FC } from "react";
import styled from "styled-components";

interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage: any;
  onPageChange: any;
}
const PaginationList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 1em;
`;
const PaginationItem = styled.li`cursor: pointer;`;
const Pagination: FC<PaginationProps> = ({
  items,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);//1,2,3,4,5...
  return (
    <>
      <PaginationList>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <a onClick={() => onPageChange(page)}>{page}</a>
          </PaginationItem>
        ))}
      </PaginationList>
    </>
  );
};
export default Pagination;
