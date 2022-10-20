import React, { Component } from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/source/icons/logo.svg';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={`${styles.wrapper} wrapper`}>
          <div className={styles.logo}>
            <img src={logo} alt="Mr Пылесосов" />
            <h1 className={styles.title}>Mr Пылесосов</h1>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
