import React from 'react';
import styles from './Card.module.scss';
import { Item } from '../../../models/Item.interface';
import { Rating } from './Rating/Rating';
import ButtonBasket from './ButtonBasket/ButtonBasket';
import ButtonFavorite from './ButtonFavorite/ButtonFavorite';

export const Card = (props: Item) => {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={props.image} alt={`${props.model}`} />
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className="header-text">{`${props.model}`}</h3>
          <Rating value={props.rating} />
          <ul className={styles.info}>
            <li className={styles.list}>
              <span className="text">Brand </span>
              <span className="text feature-text">{`${props.brand}`}</span>
            </li>
            <li className={styles.list}>
              <span className="text">Color</span>
              <span className="text feature-text">{`${props.color}`}</span>
            </li>
            <li className={styles.list}>
              <span className="text">Cleaning type</span>
              <span className="text feature-text">{`${props.cleaningType}`}</span>
            </li>
            <li className={styles.list}>
              <span className="text">Suction power</span>
              <span className="text feature-text">{`${props.suctionPower}`} watts</span>
            </li>
          </ul>
        </div>

        <div className={styles.buy}>
          <span className={styles.price}>{`${props.price}`} rub</span>
          <div className={styles.buttons}>
            <ButtonBasket />
            <ButtonFavorite />
          </div>
          <span className="text feature-text">
            In stock {props.count} {props.count > 1 ? 'peaces' : 'peace'}
          </span>
        </div>
      </div>
    </article>
  );
};
