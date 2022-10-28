import React, { Component, MouseEventHandler } from 'react';
import styles from './Catalog.module.scss';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import { CatalogState } from '../../../models/CatalogState.interface';
import { Character } from '../../../models/Character.interface';
import { Characters } from '../../../models/Characters.interface';
import { BASE_PATH, SEARCH_PATH } from '../../../pages/Api/Api';
import Preloader from '../Preloader/Preloader';

class Catalog extends Component<{ searchQuery: string }, CatalogState> {
  state = {
    searchQuery: this.props.searchQuery || '',
    result: {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    },
    selectedCharacter: null,
    isLoading: true,
    isError: false,
  };

  setCharacters = (result: Characters) => this.setState({ result });

  setLoading = (value: boolean) =>
    this.setState((prevState: CatalogState) => ({
      ...prevState,
      isLoading: value,
    }));

  setError = (value: boolean) =>
    this.setState((prevState: CatalogState) => ({
      ...prevState,
      isError: value,
    }));

  getCharacters = (url: string) => {
    this.setError(false);
    this.setLoading(true);
    fetch(url)
      .then((res: Response) => res.json())
      .then((result) => {
        this.setLoading(false);

        if (!result.error) {
          this.setCharacters(result);
        } else {
          this.setError(true);
        }
      })
      .catch((error) => error);
  };

  componentDidMount() {
    this.getCharacters(`${BASE_PATH}${SEARCH_PATH}${this.props.searchQuery}`);
  }

  componentDidUpdate(prevProps: { searchQuery: string }) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.getCharacters(`${BASE_PATH}${SEARCH_PATH}${this.props.searchQuery}`);
    }
  }

  selectCharacter = (character: Character) => {
    this.setState((prevState: CatalogState) => ({
      ...prevState,
      selectedCharacter: character,
    }));
  };

  resetCharacter = () => {
    this.setState((prevState: CatalogState) => ({
      ...prevState,
      selectedCharacter: null,
    }));
  };

  handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const button: HTMLButtonElement = event.target as HTMLButtonElement;

    if (!button.classList.contains('button')) {
      return;
    }

    const prev = this.state.result.info.prev;
    const next = this.state.result.info.next;

    if (prev && button.classList.contains('prev')) {
      this.getCharacters(prev);
    }

    if (next && button.classList.contains('next')) {
      this.getCharacters(next);
    }
  };

  render() {
    const state: Characters = this.state.result;
    const isLoading: boolean = this.state.isLoading;
    const isError: boolean = this.state.isError;

    return (
      <>
        <div className={styles.buttons}>
          <button
            className={`button button_basic prev ${styles.button}`}
            onClick={this.handleClick}
            disabled={!state?.info?.prev || isError || isLoading}
          >
            &#8592;
          </button>
          <button
            className={`button button_basic next ${styles.button}`}
            onClick={this.handleClick}
            disabled={!state?.info?.next || isError || isLoading}
          >
            &#8594;
          </button>
        </div>

        {isError ? (
          <h3 className="header-text">Sorry, the data is not found</h3>
        ) : isLoading ? (
          <Preloader />
        ) : (
          <section className={styles.catalog}>
            {state.results &&
              state.results.map((item: Character) => (
                <Card selectCharacter={this.selectCharacter} key={item.id} character={item} />
              ))}
            {this.state.selectedCharacter && (
              <Modal
                character={this.state.selectedCharacter}
                resetCharacter={this.resetCharacter}
              />
            )}
          </section>
        )}
      </>
    );
  }
}

export default Catalog;
