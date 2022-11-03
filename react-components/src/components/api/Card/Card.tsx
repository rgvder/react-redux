import React, { Component } from 'react';
import styles from './Card.module.scss';
import { Character } from '../../../models/Character.interface';

const Card = (props: { character: Character; selectCharacter: (character: Character) => void }) => {
  const handleClick = () => {
    props.selectCharacter(props.character);
  };
  return (
    <article className={styles.card} onClick={handleClick} data-testid="card">
      <div className={styles.image}>
        <img
          className={styles.avatar}
          src={props.character.image}
          alt={`${props.character.name}`}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className="header-text">{`${props.character.name}`}</h3>
          <div>
            <span className="text">Status </span>
            <h3 className="header-text">{`${props.character.status}`}</h3>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
