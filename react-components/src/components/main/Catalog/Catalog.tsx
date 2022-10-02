import React, { Component } from 'react';
import styles from './Catalog.module.scss';
import items from '../../../assets/source/items.json';
import { Card } from '../Card/Card';

class Catalog extends Component {
  render() {
    return (
      <section className={styles.catalog}>
        <div>
          {items &&
            items.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                brand={item.brand}
                brandId={item.brandId}
                model={item.model}
                color={item.color}
                colorId={item.colorId}
                price={item.price}
                rating={item.rating}
                count={item.count}
                suctionPower={item.suctionPower}
                cleaningType={item.cleaningType}
                cleaningTypeId={item.cleaningTypeId}
                isPopular={item.isPopular}
                id={item.id}
              />
            ))}
        </div>
      </section>
    );
  }
}

export default Catalog;
