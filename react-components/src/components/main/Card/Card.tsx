import React, { Component } from 'react';
import styles from './Card.module.scss';
import { Character } from '../../../models/Character.interface';

class Card extends Component<{
  character: Character;
  selectCharacter: (character: Character) => void;
}> {
  handleClick = () => {
    this.props.selectCharacter(this.props.character);
  };

  render() {
    return (
      <article className={styles.card} onClick={this.handleClick}>
        <div className={styles.image}>
          <img
            className={styles.avatar}
            src={this.props.character.image}
            alt={`${this.props.character.name}`}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className="header-text">{`${this.props.character.name}`}</h3>
            <div>
              <span className="text">Status </span>
              <h3 className="header-text">{`${this.props.character.status}`}</h3>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default Card;
