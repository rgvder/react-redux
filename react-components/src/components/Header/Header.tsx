import React, { Component } from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/source/Rick_and_Morty_Logo_and_Image.webp';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={`${styles.wrapper} wrapper`}>
          <div className={styles.logo}>
            <img className={styles.image} src={logo} alt="Rick and Morty" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
