import React, { Component, KeyboardEventHandler, MouseEventHandler, SyntheticEvent } from 'react';
import styles from './SearchBar.module.scss';

class SearchBar extends Component<
  { addSearchQuery: (searchQuery: string) => void },
  { searchQuery: string }
> {
  public nameInput: React.RefObject<HTMLInputElement> | null;

  constructor(props: { addSearchQuery: (searchQuery: string) => void }) {
    super(props);

    this.nameInput = React.createRef();

    this.state = {
      searchQuery: '',
    };
  }

  // checkInputValue: () => boolean = () => {
  //   return !this.nameInput || !this.nameInput.current || !this.nameInput.current.value;
  // };

  // setResult = (filterResult: Characters) => this.setState({ filterResult });
  //
  // componentDidMount() {
  //   fetch(`${BASE_PATH}${SEARCH_PATH}${this.nameInput?.current?.value}`)
  //     .then((res: Response) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       this.setResult(result);
  //     })
  //     .catch((error) => error);
  // }

  saveValueHandler: KeyboardEventHandler<HTMLInputElement> = (
    event: SyntheticEvent<HTMLInputElement, KeyboardEvent>
  ) => {
    event.preventDefault();

    if (!this.nameInput || !this.nameInput.current || !this.nameInput.current.value) {
      return;
    }

    if (event.nativeEvent.code === 'Enter') {
      this.setState({ searchQuery: this.nameInput.current.value });
      this.props.addSearchQuery(this.nameInput.current.value);
    }
  };

  removeInputValue: MouseEventHandler = () => {
    if (!this.nameInput || !this.nameInput.current || !this.nameInput.current.value) {
      return;
    }

    this.nameInput.current.value = '';
    this.setState({ searchQuery: '' });
    this.props.addSearchQuery('');
  };

  render() {
    return (
      <div className={styles.search}>
        <input
          ref={this.nameInput}
          onKeyUp={this.saveValueHandler}
          className={styles['input-text']}
          type="text"
          placeholder="Enter the name of the character..."
          autoComplete="off"
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
