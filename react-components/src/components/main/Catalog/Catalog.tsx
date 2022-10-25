import React, { Component, MouseEventHandler } from 'react';
import styles from './Catalog.module.scss';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import { CatalogState } from '../../../models/CatalogState.interface';
import { Character } from '../../../models/Character.interface';
import { Characters } from '../../../models/Characters.interface';
import { BASE_PATH, SEARCH_PATH } from '../../../pages/Main/Main';
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
  };

  setCharacters = (result: Characters) => this.setState({ result });

  setLoading = () =>
    this.setState((prevState: CatalogState) => ({
      ...prevState,
      isLoading: false,
    }));

  getCharacters = (url: string) => {
    fetch(url)
      .then((res: Response) => res.json())
      .then((result) => {
        this.setLoading();
        this.setCharacters(result);
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
      console.log(prev);
      this.getCharacters(prev);
    }

    if (next && button.classList.contains('next')) {
      console.log(next);
      this.getCharacters(next);
    }
  };

  render() {
    const state: Characters = this.state.result;
    const isLoading: boolean = this.state.isLoading;

    return (
      <>
        <div className={styles.buttons}>
          <button
            className={`button button_basic prev ${styles.button}`}
            onClick={this.handleClick}
            disabled={!state.info.prev}
          >
            &#8592;
          </button>
          <button
            className={`button button_basic next ${styles.button}`}
            onClick={this.handleClick}
            disabled={!state.info.next}
          >
            &#8594;
          </button>
        </div>

        {isLoading ? (
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
