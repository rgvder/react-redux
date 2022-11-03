import React, { useState } from 'react';
import Catalog from '../../components/api/Catalog/Catalog';
import SearchBar from '../../components/api/SearchBar/SearchBar';

export const BASE_PATH = 'https://rickandmortyapi.com/api/character';
export const SEARCH_PATH = '/?name=';

const useApi = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const addSearchQuery = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return { searchQuery, addSearchQuery };
};

const Api = () => {
  const { searchQuery, addSearchQuery } = useApi();

  return (
    <>
      <SearchBar addSearchQuery={addSearchQuery} />
      <Catalog searchQuery={searchQuery} />
    </>
  );
};

export default Api;
