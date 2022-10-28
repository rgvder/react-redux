import React, { Component } from 'react';
import styles from './Preloader.module.scss';

class Preloader extends Component<Record<string, never>, Record<string, never>> {
  render() {
    return (
      <div className={styles.preloader}>
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}

export default Preloader;
