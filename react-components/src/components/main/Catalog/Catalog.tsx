import React, { Component } from 'react';
import styles from './Catalog.module.scss';
import { Card } from '../Card/Card';
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

  render() {
    const state: Characters = this.state.result;

    return (
      <section className={styles.catalog}>
        <div>
          {state.results &&
            state.results.map((item: Character) => (
              <Card key={item.id} image={item.image} name={item.name} status={item.status} />
            ))}
        </div>
      </section>
    );
  }
}

export default Catalog;
