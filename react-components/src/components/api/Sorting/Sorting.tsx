import React, { useContext } from 'react';
import styles from './Sorting.module.scss';
import { Context } from '../../AppContext/Context';
import { apiSorting } from '../../../models/ApiSorting.enum';
import { AppActionTypes } from '../../../models/AppState.interface';

const Sorting = () => {
  const { dispatch } = useContext(Context);

  const handleClick = (sortingType: apiSorting) => {
    dispatch({ type: AppActionTypes.API_SET_SORTING_VALUE, payload: sortingType });
  };

  return (
    <div className={styles.sorting}>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          type="radio"
          name="sorting"
          id="all"
          onClick={() => {
            handleClick(apiSorting.all);
          }}
        />
        <label className={styles.label} htmlFor="all">
          All
        </label>
      </div>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          type="radio"
          name="sorting"
          id="alive"
          onClick={() => {
            handleClick(apiSorting.alive);
          }}
        />
        <label className={styles.label} htmlFor="alive">
          Alive
        </label>
      </div>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          type="radio"
          name="sorting"
          id="dead"
          onClick={() => {
            handleClick(apiSorting.dead);
          }}
        />
        <label className={styles.label} htmlFor="dead">
          Dead
        </label>
      </div>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          type="radio"
          name="sorting"
          id="unknown"
          onClick={() => {
            handleClick(apiSorting.unknown);
          }}
        />
        <label className={styles.label} htmlFor="unknown">
          Unknown
        </label>
      </div>
    </div>
  );
};

export default Sorting;
