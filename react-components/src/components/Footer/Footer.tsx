import React, { Component } from 'react';
import styles from './Footer.module.scss';

import rss from '../../assets/source/icons/rs_school_js.svg';
import git from '../../assets/source/icons/git.svg';

class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        <div className={`${styles.wrapper} wrapper`}>
          <a
            className={styles.link}
            href="https://rs.school/react/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={rss} alt="The Rolling Scopes course" width="120" />
          </a>
          <div className={styles.info}>
            2022
            <a
              className={styles.link}
              href="https://github.com/rgvder"
              rel="noreferrer"
              target="_blank"
            >
              <img src={git} alt="https://github.com/rgvder" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
