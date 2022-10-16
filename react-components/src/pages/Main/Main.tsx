import React, { Component } from 'react';
import SearchBar from '../../components/main/SearchBar/SearchBar';
import Catalog from '../../components/main/Catalog/Catalog';
import items from '../../assets/source/items.json';
import { Item } from '../../models/Item.interface';

class Main extends Component<Record<string, never>, { items: Item[] }> {
  state = {
    items: items,
  };

  filterItems: (query: string) => void = (query: string) => {
    this.setState({
      items: [
        ...items.filter(
          (item: Item) => !query || item.model.toLowerCase().includes(query.toLowerCase())
        ),
      ],
    });
  };

  render() {
    return (
      <>
        <SearchBar filterItems={this.filterItems} />
        {this.state.items.length ? (
          <Catalog items={this.state.items} />
        ) : (
          <p className="text">Nothing was found according to your request.</p>
        )}
      </>
    );
  }
}

export default Main;
