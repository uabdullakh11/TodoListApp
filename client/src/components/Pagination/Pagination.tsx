import { FC } from "react";
import { PaginationList, PaginationItem, PaginationLink, NavButton } from "./paginationStyles"
import { usePagination } from "@/utils/hooks/usePagination";

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {

  const totalPageCount = Math.ceil(totalCount / pageSize); // 100/10

  const paginationRange = usePagination({
    totalPageCount,
    currentPage,
  });

  const handlePrev = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1)
    }
  }
  const handleNext = () => {
    if (currentPage !== totalPageCount) {
      onPageChange(currentPage + 1)
    }
  }

  if (totalPageCount === 1) return null;

  return (
    <>
      <PaginationList>
        <NavButton onClick={handlePrev} $disabled={currentPage === 1}>&#60;</NavButton>
        {paginationRange()?.map((page, index) => {
          if (page === "...") {
            return <PaginationItem $active={false} key={page + index}>&#8230;</PaginationItem>;
          }
          return (
            <PaginationItem $active={
              page === currentPage ? true : false
            } key={page}>
              <PaginationLink onClick={() => onPageChange(page as number)}
                $active={
                  page === currentPage ? true : false
                }>{page}</PaginationLink>
            </PaginationItem>)
        })}
        {/* {pages.map((page) => (
          <PaginationItem $active={
            page === currentPage ? true : false
          } key={page}>
            <PaginationLink onClick={() => onPageChange(page)}
              $active={
                page === currentPage ? true : false
              }>{page}</PaginationLink>
          </PaginationItem>
        ))} */}
        <NavButton onClick={handleNext} $disabled={currentPage === totalPageCount}>&#62;</NavButton>
      </PaginationList>
    </>
  );
};
export default Pagination;
