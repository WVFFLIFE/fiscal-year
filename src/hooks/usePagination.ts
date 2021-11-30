import { useState, useCallback } from 'react';

interface PaginationModel {
  rowsPerPage: number;
  currentPage: number;
}

export function slice<T>(list: T[], currentPage: number, rowsPerPage: number) {
  return list.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );
}

const usePagination = (
  options: PaginationModel = { currentPage: 0, rowsPerPage: 10 }
) => {
  const [pagination, setPagination] = useState<PaginationModel>({
    currentPage: options.currentPage,
    rowsPerPage: options.rowsPerPage,
  });

  const handleChaneRowsPerPage = useCallback((rowsPerPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      rowsPerPage,
    }));
  }, []);

  const handleChangeCurrentPage = useCallback((page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page - 1,
    }));
  }, []);

  return { ...pagination, handleChaneRowsPerPage, handleChangeCurrentPage };
};

export default usePagination;
