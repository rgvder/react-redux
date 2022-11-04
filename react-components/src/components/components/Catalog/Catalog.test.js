import { render, screen } from '@testing-library/react';
import Catalog from './Catalog';

describe('Catalog', () => {
  it('renders Catalog component', () => {
    const item = [
      {
        id: 1,
        image: '/images/items/1.Roborock-S5-MAX-white.webp',
        brand: 'Roborock',
        brandId: 0,
        model: 'Roborock S5 MAX',
        color: 'white',
        colorId: 200,
        price: 32990,
        rating: 5,
        count: 6,
        suctionPower: 58,
        cleaningType: 'dry and wet',
        cleaningTypeId: 101,
        isPopular: true,
      },
    ];

    render(<Catalog items={item} />);
    expect(screen.getAllByTestId('card')).toHaveLength(1);
  });
});
