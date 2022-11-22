import React from 'react';
import styles from './Catalog.module.scss';
import { Card } from '../Card/Card';
import { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux/hooks';

const Catalog = () => {
  const componentItems = useAppSelector((state: RootState) => state.components.componentItems);

  return (
    <section className={styles.catalog}>
      {componentItems &&
        componentItems.map((item) => (
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
    </section>
  );
};

export default Catalog;
