import React, { Component } from 'react';
import Catalog from '../../components/api/Catalog/Catalog';
import SearchBar from '../../components/api/SearchBar/SearchBar';

export const BASE_PATH = 'https://rickandmortyapi.com/api/character';
export const SEARCH_PATH = '/?name=';

class Api extends Component<Record<string, never>, { searchQuery: string }> {
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

export default Api;
