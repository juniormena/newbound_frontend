import { useState } from 'react';

export function usePagination(state,itemspp=7){

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(itemspp);
  const indexOfLastitems = currentPage * itemsPerPage;
  const indexOfFirstitems = indexOfLastitems - itemsPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = state !== undefined && state.slice(indexOfFirstitems, indexOfLastitems);
  const totalItems = state !== undefined && state.length;

  return [currentItems, totalItems, paginate, itemsPerPage, currentPage];


}
