export const generatePaginationNumbers = (currentPage: number, totalPages: number ) => {
    // if number <= 7 return an array of numbers from 1 to totalPages
    if ( totalPages <= 7 ) {
        return Array.from({ length: totalPages }, (_, i) => i + 1 ); // [1,2,3,4,5,6,7];
    }

    // if current page in the first 3 pages, show first 3 pages, ellipsis, and last 2 pages
    if ( currentPage <= 3 ) {
        return [1,2,3,'...', totalPages - 1, totalPages]; // [1,2,3,...,6,7]
    }

    // if current page in the last 3 pages, show first 2 pages, ellipsis, and last 3 pages
    if ( currentPage >= totalPages - 2 ) {
        return [1,2,'...', totalPages - 2, totalPages - 1, totalPages]; // [1,2,...,5,6,7]
    }

    // if current page in the middle, show first 1 page, ellipsis, currentPage-1, currentPage, currentPage+1, ellipsis and last page
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ];
}