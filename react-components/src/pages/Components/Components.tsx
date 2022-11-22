import React from 'react';
import SearchBar from '../../components/components/SearchBar/SearchBar';
import Catalog from '../../components/components/Catalog/Catalog';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';

const Components = () => {
  const componentItems = useAppSelector((state: RootState) => state.components.componentItems);

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
