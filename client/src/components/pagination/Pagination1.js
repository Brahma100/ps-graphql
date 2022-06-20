import React, { ChangeEvent,MouseEventHandler,useContext, useState } from 'react';
import './Pagination.scss'
import { ProductContext, ProductContextType } from '../../context/ProductProvider';

const Pagination = () => {
    const { pageNo, setPageNo, totalItems, dataLimit } = useContext(ProductContext) as ProductContextType;
    const [pages] = useState<number>(Math.round(totalItems / dataLimit));

    const goToNextPage = () => {
        if (pages > pageNo) {
            setPageNo((pageNo as number) + 1);
            localStorage.setItem('pageNo', JSON.stringify((pageNo as number) + 1))
        }
    }

    const goToPreviousPage = () => {
        if (pageNo > 1) {
            setPageNo((pageNo as number) - 1);
            localStorage.setItem('pageNo', JSON.stringify((pageNo as number) - 1))
        }
    }
    const changePage:(event:MouseEventHandler<HTMLButtonElement>)=>void = (event) => {
        const pageNumber = Number((event.target as HTMLButtonElement).textContent);
        setPageNo(pageNumber);
        localStorage.setItem('pageNo', JSON.stringify(pageNumber))
    }

    const getPaginationGroup = () => {
        let start = Math.floor(((pageNo as number) - 1) / 5) * 5;
        return new Array(5).fill(0).map((_, idx) => start + idx + 1);
    };

    return (
        <div>
            <div className="pagination">
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${pageNo === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>

                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${pageNo === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                <button
                    onClick={goToNextPage}
                    className={`next ${pageNo === pages ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>
        </div>
    );
}
export default Pagination;