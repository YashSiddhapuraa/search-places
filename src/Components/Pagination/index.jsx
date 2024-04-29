import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import Input from '../Input';

import styles from './styles.module.css';

const Pagination = ({ nPages = 0, currentPage, setCurrentPage }) => {
    const [inptPage, setInptPage] = useState(currentPage)

    const [debouncedSearchTerm] = useDebounce(inptPage, 300);
    useEffect(() => {
        setCurrentPage(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.btn}
            >
                Prev
            </button>
            <div className={styles.currentPageOfNPage}>
                <Input type='number' value={currentPage} classNameWrapper={styles.classNameWrapper} handleOnChange={(e) => setInptPage(e.target.value)} max={nPages} />
                <div>of</div>  <div>{nPages}</div>
            </div>
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === nPages}
                className={styles.btn}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination