import React, { ChangeEventHandler, Component, MouseEventHandler } from 'react';
import styles from './SearchBar.module.scss';

class SearchBar extends Component<Record<string, never>, { value: string }> {
  constructor(props: Record<string, never> | Readonly<Record<string, never>>) {
    super(props);

    this.state = {
      value: localStorage.getItem('value') || '',
    };
  }

  saveValueHandler: ChangeEventHandler = (event) => {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    this.setState(() => ({
      value: input.value,
    }));
  };

  removeInputValue: MouseEventHandler = () => {
    localStorage.removeItem('value');

    this.setState(() => ({
      value: '',
    }));
  };

  componentWillUnmount() {
    localStorage.setItem('value', this.state.value);
  }

  render() {
    return (
      <div className={styles.search}>
        <input
          onChange={this.saveValueHandler}
          className={styles['input-text']}
          type="text"
          placeholder="Search..."
          autoComplete="off"
          value={this.state.value}
          autoFocus
        />
        <button className={styles.button} type="button" onClick={this.removeInputValue}>
          <svg
            className={styles.icon}
            width="14"
            height="14"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7.99999 6.58578L14.2929 0.292893C14.6834 -0.0976313 15.3166 -0.0976307 15.7071 0.292894C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 7.99999L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L7.99999 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292894 15.7071C-0.0976307 15.3166 -0.0976313 14.6834 0.292893 14.2929L6.58578 7.99999L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
            />
          </svg>
        </button>
      </div>
    );
  }
}

export default SearchBar;
