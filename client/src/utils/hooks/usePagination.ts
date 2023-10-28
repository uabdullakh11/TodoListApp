import React from "react";

interface PaginationProps {
  totalPageCount: number;
  currentPage: number;
}

export const usePagination = ({
  totalPageCount,
  currentPage,
}: PaginationProps) => {
  const siblingCount = 1;//колво соседних номеров
  const DOTS = "...";

  const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, i) => i + start);
  };
  //   const paginationRange = React.useCallback(() => {
  const paginationRange = () => {
    const totalPageNumbers = siblingCount + 5;

    //если общее колво номеров меньше то точки не нужны
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    //соседние номера слева и справа
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    //нужн ли точки слева или справа
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    //точки после 5
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }
 
    //точки после 1
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    //номера посередине а точки слева и справа
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  };
  //   }, [currentPage, pageSize, totalCount]);
  //   console.log(paginationRange());
  return paginationRange;
};
