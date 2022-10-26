import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';
import Catalog from '../Catalog/Catalog';
import Card from '../Card/Card';

describe('Modal', () => {
  it('renders Modal component', async () => {
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

    render(<Modal character={character} />);
    expect(await screen.findByText(/Rick/i)).toBeInTheDocument();
    expect(await screen.findByText(/Status/i)).toBeInTheDocument();
    expect(await screen.findByRole(/img/i)).toBeInTheDocument();
  });

  it('renders button in Modal component, button is clicked', async () => {
    render(<Catalog searchQuery={() => {}} />, <Card />, <Modal character={() => {}} />);
    const cards = await screen.findAllByRole('article');
    const card = cards[4];

    fireEvent.click(card);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('button'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('overlay is clicked', async () => {
    render(<Catalog searchQuery={() => {}} />, <Card />, <Modal character={() => {}} />);
    const cards = await screen.findAllByRole('article');
    const card = cards[2];

    fireEvent.click(card);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('overlay'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('modal is clicked', async () => {
    render(<Catalog searchQuery={() => {}} />, <Card />, <Modal character={() => {}} />);
    const cards = await screen.findAllByRole('article');
    const card = cards[1];

    fireEvent.click(card);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('modal'));
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });
});
