import React, { FC } from 'react';
import styles from './Rating.module.scss';
import { RatingProps } from '../../../../models/RatingProps.interface';

const Rating: FC<RatingProps> = (props) => {
  return <div className={`${styles.rating} ${styles[`rating-${props.value}`]}`} />;
};

export default Rating;
