import React, { useRef } from 'react';
import styles from './Sorting.module.scss';
import { apiSorting } from '../../../models/ApiSorting.enum';
import { RootState } from '../../../redux/store';
import { setSortingValue } from '../../../redux/slices/apiSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const Sorting = () => {
  const sortingFieldSet = useRef<HTMLFieldSetElement>(null);

  const dispatch = useAppDispatch();
  const { sorting } = useAppSelector((state: RootState) => state.api);

  sortingFieldSet?.current?.elements?.namedItem(sorting)?.setAttribute('checked', 'checked');

  const handleClick = (sortingType: apiSorting) => {
    dispatch(setSortingValue(sortingType));
  };

  return (
    <fieldset className={styles.sorting} name="sorting" ref={sortingFieldSet}>
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
    </fieldset>
  );
};

export default Sorting;
