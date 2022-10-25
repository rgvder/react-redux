import React, { Component, lazy, Suspense } from 'react';
import SearchBar from '../../components/main/SearchBar/SearchBar';

export const BASE_PATH = 'https://rickandmortyapi.com/api/character';
export const SEARCH_PATH = '/?name=';

class Main extends Component {
  state = {
    searchQuery: '',
  };

  addSearchQuery = (searchQuery: string) => {
    this.setState({ searchQuery: searchQuery });
  };

  render() {
    const Catalog = lazy(() => import('../../components/main/Catalog/Catalog'));
    return (
      <>
        <SearchBar addSearchQuery={this.addSearchQuery} />
        <Suspense fallback={<div>Loading...</div>}>
          <Catalog searchQuery={this.state.searchQuery} />
        </Suspense>
      </>
    );
  }
}

export default Main;
