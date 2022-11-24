import React, { ChangeEventHandler } from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import {
  API_COUNT,
  BASE_PATH,
  PAGINATION_PATH,
  SEARCH_PATH,
  SORTING_PATH,
} from '../../../models/api/ApiConstants';
import { RootState } from '../../../redux/store';
import {
  fetchApi,
  setApiPage,
  setForcePage,
  setPages,
  setSegment,
} from '../../../redux/slices/apiSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { FetchApiArgs } from '../../../models/api/FetchApiArgs.interface';

const Pagination = () => {
  const { apiSearchQuery, sorting } = useAppSelector((state: RootState) => state.api);
  const { pages, cardPerPage, forcePage } = useAppSelector(
    (state: RootState) => state.api.pagination
  );

  const dispatch = useAppDispatch();

  const changePageCount: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const fetchApiArgs: FetchApiArgs = {
      url: `${BASE_PATH}?${PAGINATION_PATH}${
        apiSearchQuery ? '&' + SEARCH_PATH + apiSearchQuery : ''
      }${sorting ? '&' + SORTING_PATH + sorting : ''}`,
      segment: 1,
      characterPerPage: +event.target.value,
    };

    dispatch(setPages(+event.target.value));
    dispatch(fetchApi(fetchApiArgs));
  };

  const handlePageChange = (currentPage: { selected: number }) => {
    const pageNum = currentPage.selected + 1;
    const totalCardCount = cardPerPage * pageNum;
    const apiPage = Math.ceil(totalCardCount / API_COUNT);
    const perPageRatio = API_COUNT / cardPerPage;
    const segment = pageNum % perPageRatio || perPageRatio;

    const fetchApiArgs: FetchApiArgs = {
      url: `${BASE_PATH}?${PAGINATION_PATH}${apiPage}${
        apiSearchQuery ? '&' + SEARCH_PATH + apiSearchQuery : ''
      }${sorting ? '&' + SORTING_PATH + sorting : ''}`,
      segment,
      cardPerPage,
    };

    dispatch(setForcePage(currentPage.selected));
    dispatch(setSegment(segment));
    dispatch(setApiPage(apiPage));
    dispatch(fetchApi(fetchApiArgs));
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
          previousLinkClassName={styles.link}
          nextClassName={`${styles.item} ${styles.next}`}
          nextLinkClassName={styles.link}
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
