export const paginate = (items: Array<JSX.Element> ,pageNumber:number, pageSize:number) => {
  const startIndex = (pageNumber - 1) * pageSize;//(2-1)*10=10
  return items.slice(startIndex, startIndex + pageSize); // 0, 9
};