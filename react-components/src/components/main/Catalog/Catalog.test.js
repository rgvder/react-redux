import { render, screen } from '@testing-library/react';
import Catalog from './Catalog';

describe('Catalog', () => {
  it('renders InfoCards component', () => {
    render(<Catalog />);
    expect(screen.getAllByRole('article')).toHaveLength(20);
  });
});
