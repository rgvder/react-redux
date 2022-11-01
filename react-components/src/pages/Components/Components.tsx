import React, { useState } from 'react';
import SearchBar from '../../components/components/SearchBar/SearchBar';
import Catalog from '../../components/components/Catalog/Catalog';
import items from '../../assets/source/items.json';
import { Item } from '../../models/Item.interface';

const useComponents = (props: Item[]) => {
  const [state, setState] = useState(props);

  const filterItems: (query: string) => void = (query: string) => {
    setState([
      ...props.filter(
        (item: Item) => !query || item.model.toLowerCase().includes(query.toLowerCase())
      ),
    ]);
  };

  return { state, filterItems };
};

const Components = () => {
  const { state, filterItems } = useComponents(items);

  return (
    <>
      <SearchBar filterItems={filterItems} />
      {state.length ? (
        <Catalog items={state} />
      ) : (
        <p className="text">Nothing was found according to your request.</p>
      )}
    </>
  );
};

export default Components;
