import React, { Component } from 'react';
import SearchBar from '../../components/main/SearchBar/SearchBar';
import Catalog from '../../components/main/Catalog/Catalog';

class Main extends Component {
  render() {
    return (
      <>
        <SearchBar />
        <Catalog />
      </>
    );
  }
}

export default Main;
