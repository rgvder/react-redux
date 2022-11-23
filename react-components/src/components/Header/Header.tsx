import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

const Header = () => {
  const { selectedCharacter } = useAppSelector((state: RootState) => state.api);

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
