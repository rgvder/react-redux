import React, { Component } from 'react';
import Catalog from '../../components/main/Catalog/Catalog';
import SearchBar from '../../components/main/SearchBar/SearchBar';
import { Characters } from '../../models/Characters.interface';

export const BASE_PATH = 'https://rickandmortyapi.com/api/character';
export const SEARCH_PATH = '/?name=';
// export const SEARCH_PARAM = 'query=';

class Main extends Component {
  state = {
    searchQuery: '',
  };

  addSearchQuery = (searchQuery: string) => {
    this.setState({ searchQuery: searchQuery });
  };

  render() {
    return (
      <>
        <SearchBar addSearchQuery={this.addSearchQuery} />
        <Catalog searchQuery={this.state.searchQuery} />
      </>
    );
  }
}

export default Main;
