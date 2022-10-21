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
        <img
          className={styles.image}
          src={this.props.character.image}
          alt={`${this.props.character.name}`}
        />
        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className="header-text">{`${this.props.character.name}`}</h3>
            <h3 className="header-text">{`${this.props.character.status}`}</h3>
          </div>
        </div>
      </article>
    );
  }
}

export default Card;
