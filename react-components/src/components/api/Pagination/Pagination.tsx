import React, { ChangeEventHandler, useContext, useEffect } from 'react';
import styles from './Pagination.module.scss';
import { Context } from '../../AppContext/Context';
import ReactPaginate from 'react-paginate';
import { AppActionTypes } from '../../../models/AppState.interface';
import {
  API_COUNT,
  BASE_PATH,
  PAGINATION_PATH,
  SEARCH_PATH,
  SORTING_PATH,
} from '../../../models/ApiConstants';

const Pagination = () => {
  const {
    getCharacters,
    dispatch,
    state: {
      apiState: {
        sorting,
        apiSearchQuery,
        pagination: { pages, cardPerPage, forcePage },
      },
    },
  } = useContext(Context);

  const changePageCount: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch({ type: AppActionTypes.API_SET_PAGES, payload: +event.target.value });
  };

  useEffect(() => {
    getCharacters(
      `${BASE_PATH}?${PAGINATION_PATH}${apiSearchQuery ? '&' + SEARCH_PATH + apiSearchQuery : ''}${
        sorting ? '&' + SORTING_PATH + sorting : ''
      }`,
      1
    );
  }, [cardPerPage]);

  const handlePageChange = (currentPage: { selected: number }) => {
    const pageNum = currentPage.selected + 1;
    const totalCardCount = cardPerPage * pageNum;
    const apiPage = Math.ceil(totalCardCount / API_COUNT);
    const perPageRatio = API_COUNT / cardPerPage;
    const segment = pageNum % perPageRatio || perPageRatio;

    getCharacters(
      `${BASE_PATH}?${PAGINATION_PATH}${apiPage}${
        apiSearchQuery ? '&' + SEARCH_PATH + apiSearchQuery : ''
      }${sorting ? '&' + SORTING_PATH + sorting : ''}`,
      segment
    );

    dispatch({ type: AppActionTypes.API_SET_FORCE_PAGE, payload: currentPage.selected });
    dispatch({ type: AppActionTypes.API_SET_SEGMENT, payload: segment });
    dispatch({ type: AppActionTypes.API_SET_PAGE, payload: apiPage });
  };

  return (
    <>
      <div className={styles.pagination}>
        <select className={styles.select} onChange={changePageCount} value={cardPerPage}>
          <option value="20">20</option>
          <option value="10">10</option>
          <option value="5">5</option>
        </select>
        <ReactPaginate
          onPageChange={handlePageChange}
          nextLabel="&#8594;"
          previousLabel="&#8592;"
          breakLabel="..."
          pageCount={pages}
          containerClassName={styles.wrapper}
          pageClassName={styles.item}
          pageLinkClassName={styles.link}
          activeClassName={styles.active}
          previousClassName={`${styles.item} ${styles.previous}`}
          nextClassName={`${styles.item} ${styles.next}`}
          breakClassName={styles.item}
          breakLinkClassName={styles.link}
          disabledClassName={styles.disabled}
          forcePage={forcePage}
        />
      </div>
    </>
  );
};

export default Pagination;
