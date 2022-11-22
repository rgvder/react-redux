import React, { ChangeEventHandler, useContext } from 'react';
import styles from './Pagination.module.scss';
import { Context } from '../../AppContext/Context';
import ReactPaginate from 'react-paginate';
import {
  API_COUNT,
  BASE_PATH,
  PAGINATION_PATH,
  SEARCH_PATH,
  SORTING_PATH,
} from '../../../models/ApiConstants';
import { RootState } from '../../../redux/store';
import {
  fetchApi,
  setApiPage,
  setForcePage,
  setPages,
  setSegment,
} from '../../../redux/slices/apiSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const Pagination = () => {
  const {
    getCharacters,
    //dispatch,
    state: {
      apiState: {
        //sorting,
        //apiSearchQuery,
        //pagination: { pages, cardPerPage, forcePage },
      },
    },
  } = useContext(Context);
  const { apiSearchQuery, sorting } = useAppSelector((state: RootState) => state.api);
  const { pages, cardPerPage, forcePage } = useAppSelector(
    (state: RootState) => state.api.pagination
  );

  const dispatch = useAppDispatch();

  const changePageCount: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch(setPages(+event.target.value));

    dispatch(
      fetchApi(
        `${BASE_PATH}?${PAGINATION_PATH}${
          apiSearchQuery ? '&' + SEARCH_PATH + apiSearchQuery : ''
        }${sorting ? '&' + SORTING_PATH + sorting : ''}`
      )
    );

    dispatch(setSegment(1));

    getCharacters(
      `${BASE_PATH}?${PAGINATION_PATH}${apiSearchQuery ? '&' + SEARCH_PATH + apiSearchQuery : ''}${
        sorting ? '&' + SORTING_PATH + sorting : ''
      }`,
      1,
      +event.target.value
    );
  };

  const handlePageChange = (currentPage: { selected: number }) => {
    const pageNum = currentPage.selected + 1;
    const totalCardCount = cardPerPage * pageNum;
    const apiPage = Math.ceil(totalCardCount / API_COUNT);
    const perPageRatio = API_COUNT / cardPerPage;
    const segment = pageNum % perPageRatio || perPageRatio;

    // getCharacters(
    //   `${BASE_PATH}?${PAGINATION_PATH}${apiPage}${
    //     apiSearchQuery ? '&' + SEARCH_PATH + apiSearchQuery : ''
    //   }${sorting ? '&' + SORTING_PATH + sorting : ''}`,
    //   segment
    // );

    dispatch(
      fetchApi(
        `${BASE_PATH}?${PAGINATION_PATH}${apiPage}${
          apiSearchQuery ? '&' + SEARCH_PATH + apiSearchQuery : ''
        }${sorting ? '&' + SORTING_PATH + sorting : ''}`
      )
    );

    dispatch(setForcePage(currentPage.selected));
    dispatch(setSegment(segment));
    dispatch(setApiPage(apiPage));
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
