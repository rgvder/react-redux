import React from 'react';
import styles from './Card.module.scss';
import { Character } from '../../../models/Character.interface';

export const Card = (props: Character) => {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={props.image} alt={`${props.name}`} />
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className="header-text">{`${props.name}`}</h3>
          <h3 className="header-text">{`${props.status}`}</h3>

          {/*<ul className={styles.info}>*/}
          {/*  <li className={styles.list}>*/}
          {/*    <span className="text">Brand </span>*/}
          {/*    <span className="text feature-text">{`${props.brand}`}</span>*/}
          {/*  </li>*/}
          {/*  <li className={styles.list}>*/}
          {/*    <span className="text">Color</span>*/}
          {/*    <span className="text feature-text">{`${props.color}`}</span>*/}
          {/*  </li>*/}
          {/*  <li className={styles.list}>*/}
          {/*    <span className="text">Cleaning type</span>*/}
          {/*    <span className="text feature-text">{`${props.cleaningType}`}</span>*/}
          {/*  </li>*/}
          {/*  <li className={styles.list}>*/}
          {/*    <span className="text">Suction power</span>*/}
          {/*    <span className="text feature-text">{`${props.suctionPower}`} watts</span>*/}
          {/*  </li>*/}
          {/*</ul>*/}
        </div>
      </div>
    </article>
  );
};
