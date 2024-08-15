import React, { useEffect, useState } from 'react';

const usePagination = (data, noOfRows, topOfDisplayedDataId) => {
    const [listingsLength, setListingsLength] = useState(data.length);
    const [currentPage, setCurrentPage] = useState(1);
    const [rows, setRows] = useState(noOfRows);
    const [dottedArray, setDottedArray] = useState([]);
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(listingsLength / rows);

    const movePageBy = (n) => {
        const newPage = currentPage + n;
        if (newPage >= 1 && newPage <= totalPages) {
            paginate(newPage);
        }
    };

    const jumpTo = (anchor_id) => {
        var url = window.location.href; // Saving URL without hash.
        window.location.href = "#" + anchor_id; // Navigate to the target element.
        window.history.replaceState(null, null, url); // Modify the current history entry.
    };

    const paginate = (page) => {
        setLoading(true);
        setTimeout(() => {
            setCurrentPage(page);
            setLoading(false);
        }, 1000);
        jumpTo(topOfDisplayedDataId);
    };

    useEffect(() => {
        setListingsLength(data.length); // Update listingsLength when data changes
    }, [data]);

    useEffect(() => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        let tempArrayOfPages = [...pages];
        if (pages.length <= 5) {
            tempArrayOfPages = [...pages];
        } else if (currentPage >= 1 && currentPage <= 2 && pages.length > 5) {
            tempArrayOfPages = [1, 2, '...', pages.length - 1, pages.length];
        } else if (currentPage === 3) {
            const sliced = pages.slice(0, 3);
            tempArrayOfPages = [...sliced, '...', pages.length - 1, pages.length];
        } else if (currentPage > 3 && currentPage < pages.length - 2) {
            const sliced1 = pages.slice(currentPage - 2, currentPage);
            const sliced2 = pages.slice(currentPage, currentPage + 1);
            tempArrayOfPages = [1, '...', ...sliced1, ...sliced2, '...', pages.length];
        } else if (currentPage > pages.length - 3) {
            const sliced = pages.slice(pages.length - 3);
            tempArrayOfPages = [1, 2, '...', ...sliced];
        }

        setDottedArray(tempArrayOfPages);
    }, [currentPage, rows, totalPages]); // Ensure dependencies are correct

    const start = (currentPage - 1) * rows;
    const end = start + rows;
    const displayedData = data.slice(start, end);

    return { currentPage, rows, totalPages, dottedArray, movePageBy, paginate, displayedData, loading };
};

export default usePagination;



// COPIED FROM PANDASCROW