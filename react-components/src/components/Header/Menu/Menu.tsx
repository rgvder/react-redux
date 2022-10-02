import React, { Component } from 'react';
import styles from './Menu.module.scss';

import heart from '../../../assets/source/icons/heart.svg';
import basket from '../../../assets/source/icons/basket.svg';

class Menu extends Component {
  render() {
    return (
      <div className={styles.menu}>
        <div className={styles.favorite}>
          <img src={heart} alt="Избранное" />
          <div className={styles['favorite-count']} />
        </div>
        <div className={styles.basket}>
          <img src={basket} alt="Корзина" />
          <div className={styles['basket-count']} />
        </div>
      </div>
    );
  }
}

export default Menu;
