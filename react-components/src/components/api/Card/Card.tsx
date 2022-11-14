import React, { Component, useContext } from 'react';
import styles from './Card.module.scss';
import { Character } from '../../../models/Character.interface';
import { Context } from '../../AppContext/Context';
import { Link } from 'react-router-dom';

const Card = (props: { character: Character }) => {
  const { selectCharacter } = useContext(Context);

  const handleClick = () => {
    selectCharacter(props.character);
  };

  return (
    <Link to={`${props.character.id ? props.character.id : '/api'}`}>
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
    </Link>
  );
};

export default Card;
