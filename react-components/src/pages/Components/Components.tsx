import React, { useContext } from 'react';
import SearchBar from '../../components/components/SearchBar/SearchBar';
import Catalog from '../../components/components/Catalog/Catalog';
import { Context } from '../../components/AppContext/Context';

const Components = () => {
  const appContext = useContext(Context);

  return (
    <>
      <SearchBar />
      {appContext.state.componentItems.length ? (
        <Catalog />
      ) : (
        <p className="text">Nothing was found according to your request.</p>
      )}
    </>
  );
};

export default Components;
