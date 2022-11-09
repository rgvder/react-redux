import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { Context } from '../AppContext/Context';

const Header = () => {
  const {
    state: {
      apiState: { selectedCharacter },
    },
  } = useContext(Context);

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
          <NavLink
            className={`text ${styles.link} ${!selectedCharacter ? styles.invisible : ''}`}
            to="api/:id"
          >{`${selectedCharacter?.name}`}</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
