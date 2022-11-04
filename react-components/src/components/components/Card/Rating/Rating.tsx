import React from 'react';
import styles from './Rating.module.scss';

const Rating = (props: { value: number }) => {
  return <div className={`${styles.rating} ${styles[`rating-${props.value}`]}`} />;
};

export default Rating;
