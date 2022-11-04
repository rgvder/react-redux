import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/TextPages.module.scss';

export const NotFound = () => {
  return (
    <>
      <h2 className={styles.heading}>Sorry, page not found!</h2>
      <p className={styles.text}>
        To see our products go to{' '}
        <Link className={styles.link} to="components">
          the main page
        </Link>
        .
      </p>
    </>
  );
};
