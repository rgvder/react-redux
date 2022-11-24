import React, { FC } from 'react';
import styles from './InfoCard.module.scss';
import { Proposal } from '../../../models/form/Proposal.interface';

export const InfoCard: FC<Proposal> = (props) => {
  return (
    <article className={styles.infoCard}>
      <img className={styles.image} src={props.image as string} alt={`${props.name}`} />
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className="header-text">{`${props.name}`}</h3>
          <ul className={styles.info}>
            <li className={styles.list}>
              <span className="text">Email</span>
              <span className="text feature-text">{`${props.email}`}</span>
            </li>
            <li className={styles.list}>
              <span className="text">Date of Birth</span>
              <span className="text feature-text">{`${props.dateOfBirth}`}</span>
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
            <li className={styles.list}>
              <span className="text">Delivery term</span>
              <span className="text feature-text">{`${props.deliveryTerm}`}</span>
            </li>
          </ul>
        </div>

        <div className={styles.buy}>
          <span className={styles.price}>{`${props.price}`} rub</span>
        </div>
      </div>
    </article>
  );
};
