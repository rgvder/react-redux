import React, { Component } from 'react';
import styles from './ButtonBasket.module.scss';

class ButtonBasket extends Component<Record<string, never>, { isAdded: boolean }> {
  state = {
    isAdded: false,
  };

  toggleHandler = () => {
    this.setState(({ isAdded }) => ({
      isAdded: !isAdded,
    }));
  };

  render() {
    return (
      <button
        className={`button button_basic ${styles['button-basket']}`}
        onClick={this.toggleHandler}
      >
        {this.state.isAdded ? 'Remove' : 'Buy'}
      </button>
    );
  }
}

export default ButtonBasket;
