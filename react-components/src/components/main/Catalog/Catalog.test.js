import { render, screen } from '@testing-library/react';
import Catalog from './Catalog';
import { RANDOM_STRING } from '../../../mocks/handlers';

describe('Catalog', () => {
  it('renders Catalog component', async () => {
    render(<Catalog searchQuery={() => {}} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.queryByTestId('card')).toBeNull();

    await screen.findAllByTestId('card');
    expect(screen.getAllByTestId('card')).toHaveLength(20);
  });

  it('renders Catalog component', async () => {
    render(<Catalog searchQuery={RANDOM_STRING} />);

    await screen.findAllByTestId('card');
    expect(screen.getAllByTestId('card')).toHaveLength(0);
    expect(screen.getByText('Sorry, the data is not found')).toBeInTheDocument();
  });
});
