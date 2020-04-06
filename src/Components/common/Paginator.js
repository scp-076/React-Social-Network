import classes from "../common/paginator.module.scss";
import React, {useState} from "react";

const Paginator = (props, portionSize = 10) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPotionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rigthPortionPageNumber = portionNumber * props.portionSize;

    return <div className={classes.pagesWrapper}>
        {portionNumber > 1 &&
        <button className={classes.button} onClick={() => {setPotionNumber(portionNumber - 1)}}>Prev</button>}
        {
            pages
                .filter(page => page >= leftPortionPageNumber && page <= rigthPortionPageNumber)
                .map((page, index) => {
                return <span key={index}
                             className={props.currentPage === page ? classes.selectedPage : classes.page}
                             onClick={(event) => {
                                 props.onPageChanged(page);
                             }}>{page}</span>
            })
        }
        {portionCount > portionNumber &&
        <button className={classes.button} onClick ={() => {setPotionNumber(portionNumber + 1)}}>Next</button>}
    </div>
};

export default Paginator;