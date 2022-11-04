import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/TextPages.module.scss';

export const About = () => {
  return (
    <>
      <h2 className={styles.heading}>Mr Пылесосов welcomes you!</h2>
      <p className={styles.text}>
        Our store has a wide range of robotic vacuum cleaners, each of which can become your
        faithful assistant in cleaning your home.
      </p>
      <p className={styles.text}>
        To see our products go to{' '}
        <Link className={styles.link} to="/components">
          the main page
        </Link>
        .
      </p>
    </>
  );
};
