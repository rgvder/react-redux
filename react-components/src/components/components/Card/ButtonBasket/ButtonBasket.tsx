import React from 'react';
import styles from './ButtonBasket.module.scss';
import useActiveButton from '../useActiveButton';

const ButtonBasket = () => {
  const { state, toggleHandler } = useActiveButton();

  return (
    <button className={`button button_basic ${styles['button-basket']}`} onClick={toggleHandler}>
      {state ? 'Remove' : 'Buy'}
    </button>
  );
};

export default ButtonBasket;
