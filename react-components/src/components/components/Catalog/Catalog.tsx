import React, { Component } from 'react';
import styles from './Catalog.module.scss';
import { Card } from '../Card/Card';
import { Item } from '../../../models/Item.interface';

class Catalog extends Component<{ items: Item[] }> {
  render() {
    return (
      <section className={styles.catalog}>
        <div>
          {this.props.items &&
            this.props.items.map((item) => (
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
