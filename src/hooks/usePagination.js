
import { useState } from 'react';

export const usePagination = (items, itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const resetPage = () => setCurrentPage(1);

    return {
        currentPage,
        totalPages,
        currentItems,
        handlePageChange,
        resetPage
    };
};