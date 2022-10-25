import React, { Component } from 'react';
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

  getCharacters = () => {
    fetch(`${BASE_PATH}${SEARCH_PATH}${this.props.searchQuery}`)
      .then((res: Response) => res.json())
      .then((result) => {
        this.setLoading();
        this.setCharacters(result);
        console.log(this.state.searchQuery);
      })
      .catch((error) => error);
  };

  componentDidMount() {
    this.getCharacters();
  }

  componentDidUpdate(prevProps: { searchQuery: string }) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.getCharacters();
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

  render() {
    const state: Characters = this.state.result;
    const isLoading: boolean = this.state.isLoading;

    return (
      <section className={styles.catalog}>
        {isLoading ? (
          <Preloader />
        ) : (
          <div>
            {state.results &&
              state.results.map((item: Character) => (
                <Card selectCharacter={this.selectCharacter} key={item.id} character={item} />
              ))}
          </div>
        )}
        {this.state.selectedCharacter && (
          <Modal character={this.state.selectedCharacter} resetCharacter={this.resetCharacter} />
        )}
      </section>
    );
  }
}

export default Catalog;
