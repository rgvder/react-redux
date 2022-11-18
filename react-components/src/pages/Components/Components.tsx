import React from 'react';
import SearchBar from '../../components/components/SearchBar/SearchBar';
import Catalog from '../../components/components/Catalog/Catalog';
import { useSelector } from 'react-redux';
import { State } from '../../store/store';

const Components = () => {
  const componentItems = useSelector((state: State) => state.components.componentItems);

  return (
    <>
      <SearchBar />
      {componentItems.length ? (
        <Catalog />
      ) : (
        <p className="text">Nothing was found according to your request.</p>
      )}
    </>
  );
};

export default Components;
