import { FC } from "react";
import { PaginationList, PaginationItem, PaginationLink } from "./paginationStyles"

interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
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
          <PaginationItem $active={
            page === currentPage ? true : false
          } key={page}>
            <PaginationLink onClick={() => onPageChange(page)}
              $active={
                page === currentPage ? true : false
              }>{page}</PaginationLink>
          </PaginationItem>
        ))}
      </PaginationList>
    </>
  );
};
export default Pagination;
