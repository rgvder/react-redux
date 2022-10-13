import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

import logo from '../../assets/source/icons/logo.svg';
import Menu from './Menu/Menu';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={`${styles.wrapper} wrapper`}>
          <div className={styles.logo}>
            <img src={logo} alt="Mr Пылесосов" />
            <h1 className={styles.title}>Mr Пылесосов</h1>
          </div>
          <nav className={styles.nav}>
            <NavLink className={`text`} to="/" end>
              Main
            </NavLink>
            <NavLink className={`text`} to="/form">
              Proposals
            </NavLink>
            <NavLink className={`text`} to="/about">
              About us
            </NavLink>
          </nav>
          <Menu />
        </div>
      </header>
    );
  }
}

export default Header;
