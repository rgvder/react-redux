import React, { FC } from 'react';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
import { ApiCardProps } from '../../../models/api/ApiCardProps.interface';
import { selectCharacter } from '../../../redux/slices/apiSlice';
import { useAppDispatch } from '../../../redux/hooks';

const Card: FC<ApiCardProps> = (props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(selectCharacter(props.character));
  };

  return (
    <Link to={`${props.character.id ? props.character.id : '/api'}`} onClick={handleClick}>
      <article className={styles.card} data-testid="card">
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
