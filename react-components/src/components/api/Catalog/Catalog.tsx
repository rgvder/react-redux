import React, { useContext, useEffect } from 'react';
import styles from './Catalog.module.scss';
import Card from '../Card/Card';
import { Character } from '../../../models/Character.interface';
import { BASE_PATH, SEARCH_PATH, SORTING_PATH } from '../../../pages/Api/Api';
import Preloader from '../Preloader/Preloader';
import { Context } from '../../AppContext/Context';
import Sorting from '../Sorting/Sorting';
import Pagination from '../Pagination/Pagination';

const Catalog = () => {
  const {
    getCharacters,
    state: {
      apiState: { result, isLoading, isError, apiSearchQuery, sorting },
    },
  } = useContext(Context);

  useEffect(() => {
    getCharacters(
      `${BASE_PATH}?${SEARCH_PATH}${apiSearchQuery}${sorting ? '&' + SORTING_PATH + sorting : ''}`
    );
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
