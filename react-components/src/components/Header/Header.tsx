import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={`${styles.wrapper} wrapper`}>
          <nav className={styles.nav}>
            <NavLink className={`text ${styles.link}`} to="/" end>
              Main
            </NavLink>
            <NavLink className={`text ${styles.link}`} to="/components">
              Components
            </NavLink>
            <NavLink className={`text ${styles.link}`} to="/form">
              Form
            </NavLink>
            <NavLink className={`text ${styles.link}`} to="/about">
              About us
            </NavLink>
            <NavLink className={`text ${styles.link}`} to="/api">
              API
            </NavLink>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
