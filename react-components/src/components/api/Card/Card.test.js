import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';
import Catalog from '../Catalog/Catalog';

describe('Card', () => {
  it('renders Card component', async () => {
    const character = {
      name: 'Rick',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      status: 'Alive',
      created: '',
      species: '',
      type: '',
      gender: 'Female',
      origin: {
        name: '',
        url: '',
      },
      location: {
        name: '',
        url: '',
      },
      episode: [],
      id: 1,
    };

    render(<Card character={character} />);
    expect(await screen.findByText(/Rick/i)).toBeInTheDocument();
    expect(await screen.findByText(/Status/i)).toBeInTheDocument();
    expect(await screen.findByRole(/img/i)).toBeInTheDocument();
  });

  it('Card is clicked', async () => {
    render(<Catalog searchQuery={() => {}} />, <Card />);

    const cards = await screen.findAllByRole('article');
    const card = cards[4];

    fireEvent.click(card);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
