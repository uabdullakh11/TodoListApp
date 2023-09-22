import { FC, useState } from "react";
import { PaginationList } from "../styles/containers";
import { PaginationItem, PaginationLink } from "../styles/text";

interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage: any;
  onPageChange: any;
}

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
            <PaginationLink onClick={() => onPageChange(page)} $active={
             page === currentPage ? true : false
           }>{page}</PaginationLink>
          </PaginationItem>
        ))}
      </PaginationList>
    </>
  );
};
export default Pagination;
