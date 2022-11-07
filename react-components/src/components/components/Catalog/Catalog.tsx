import React, { useContext } from 'react';
import styles from './Catalog.module.scss';
import { Card } from '../Card/Card';
import { Context } from '../../AppContext/Context';

const Catalog = () => {
  const appContext = useContext(Context);
  return (
    <section className={styles.catalog}>
      {appContext.state.componentItems &&
        appContext.state.componentItems.map((item) => (
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
