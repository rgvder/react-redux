import React, { Component, SyntheticEvent } from 'react';
import styles from './Modal.module.scss';
import { Character } from '../../../models/Character.interface';

class Modal extends Component<{ character: Character; resetCharacter: () => void }> {
  handleClick = (event: SyntheticEvent) => {
    if ((event.target as HTMLDivElement | HTMLButtonElement).classList.contains('close-modal')) {
      this.props.resetCharacter();
    }
  };

  render() {
    return (
      <>
        {this.props.character && (
          <div className={`${styles.overlay} close-modal`} onClick={this.handleClick}>
            <div className={styles.modal}>
              <button className={`${styles.button} close-modal`} />
              <div className={styles.content}>
                <div className={styles.main}>
                  <img
                    className={styles.image}
                    src={this.props.character.image}
                    alt={`${this.props.character.name}`}
                  />
                  <div className={styles['main__info']}>
                    <h2 className="header-text">{`${this.props.character.name}`}</h2>
                    <ul className={styles.info}>
                      <li className={styles.list}>
                        <span className="text">Status </span>
                        <span className="text feature-text">{`${this.props.character.status}`}</span>
                      </li>
                      <li className={styles.list}>
                        <span className="text">Type </span>
                        <span className="text feature-text">{`${
                          this.props.character.type || '-'
                        }`}</span>
                      </li>
                      <li className={styles.list}>
                        <span className="text">Gender </span>
                        <span className="text feature-text">{`${this.props.character.gender}`}</span>
                      </li>
                      <li className={styles.list}>
                        <span className="text">Created</span>
                        <span className="text feature-text">{`${this.props.character.created}`}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.info}>
                  <ul className={styles.info}>
                    <li className={styles.list}>
                      <span className="text">Origin</span>
                      <span className="text feature-text">{`${this.props.character.origin.name}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Location</span>
                      <span className="text feature-text">{`${this.props.character.location.name}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Episode</span>
                      <span className="text feature-text">{`${this.props.character.episode}`}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Modal;
