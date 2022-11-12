import React from 'react';
import Catalog from '../../components/api/Catalog/Catalog';
import SearchBar from '../../components/api/SearchBar/SearchBar';

export const BASE_PATH = 'https://rickandmortyapi.com/api/character/';
export const SEARCH_PATH = 'name=';
export const SORTING_PATH = 'status=';
export const PAGINATION_PATH = 'page=';

const Api = () => {
  return (
    <>
      <SearchBar />
      <Catalog />
    </>
  );
};

export default Api;
