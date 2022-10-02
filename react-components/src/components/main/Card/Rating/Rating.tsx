import React from 'react';
import styles from './Rating.module.scss';

export const Rating = (props: { value: number }) => {
  return <div className={`${styles.rating} ${styles[`rating-${props.value}`]}`} />;
};
