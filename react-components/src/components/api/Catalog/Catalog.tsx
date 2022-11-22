import React, { useEffect } from 'react';
import styles from './Catalog.module.scss';
import Card from '../Card/Card';
import { Character } from '../../../models/Character.interface';
import {
  BASE_PATH,
  PAGINATION_PATH,
  SEARCH_PATH,
  SORTING_PATH,
} from '../../../models/ApiConstants';
import Preloader from '../Preloader/Preloader';
import Sorting from '../Sorting/Sorting';
import Pagination from '../Pagination/Pagination';
import { fetchApi, setInitialLoading, setSegment } from '../../../redux/slices/apiSlice';
import { RootState } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const Catalog = () => {
  const dispatch = useAppDispatch();
  const { isInitialLoading, sorting, apiSearchQuery, isError, isLoading, result } = useAppSelector(
    (state: RootState) => state.api
  );
  const { segment, apiPage } = useAppSelector((state: RootState) => state.api.pagination);

  useEffect(() => {
    dispatch(
      fetchApi(
        `${BASE_PATH}?${PAGINATION_PATH}${isInitialLoading ? apiPage : ''}${
          apiSearchQuery ? '&' + SEARCH_PATH + apiSearchQuery : ''
        }${sorting ? '&' + SORTING_PATH + sorting : ''}`
      )
    );

    dispatch(setSegment(isInitialLoading ? segment : 1));

    // getCharacters(
    //   `${BASE_PATH}?${PAGINATION_PATH}${isInitialLoading ? apiPage : ''}${
    //     apiSearchQuery ? '&' + SEARCH_PATH + apiSearchQuery : ''
    //   }${sorting ? '&' + SORTING_PATH + sorting : ''}`,
    //   isInitialLoading ? segment : 1
    // );
    dispatch(setInitialLoading(false));

    return () => {
      dispatch(setInitialLoading(true));
    };
  }, [apiSearchQuery, sorting]);

  return (
    <>
      <Pagination />
      <Sorting />

      {isError ? (
        <h3 className="header-text">Sorry, the data is not found</h3>
      ) : isLoading ? (
        <Preloader />
      ) : (
        <section className={styles.catalog}>
          {result.results &&
            result.results.map((item: Character) => <Card key={item.id} character={item} />)}
        </section>
      )}
    </>
  );
};

export default Catalog;
