import React, { Component } from 'react';
import styles from './Catalog.module.scss';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import { CatalogState } from '../../../models/CatalogState.interface';
import { Character } from '../../../models/Character.interface';
import { Characters } from '../../../models/Characters.interface';

const BASE_PATH = 'https://rickandmortyapi.com/api/character';
// const SEARCH_PATH: string = '/search';
// const SEARCH_PARAM: string = 'query=';

class Catalog extends Component<Record<string, never>, CatalogState> {
  state = {
    searchQuery: '',
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
  };

  setCharacters = (result: Characters) => this.setState({ result });

  componentDidMount() {
    fetch(BASE_PATH)
      .then((res: Response) => res.json())
      .then((result) => {
        console.log(result);
        this.setCharacters(result);
      })
      .catch((error) => error);
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

    return (
      <section className={styles.catalog}>
        <div>
          {state.results &&
            state.results.map((item: Character) => (
              <Card selectCharacter={this.selectCharacter} key={item.id} character={item} />
            ))}
        </div>
        {this.state.selectedCharacter && (
          <Modal character={this.state.selectedCharacter} resetCharacter={this.resetCharacter} />
        )}
      </section>
    );
  }
}

export default Catalog;
