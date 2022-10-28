import { render, screen } from '@testing-library/react';
import { InfoCards } from './InfoCards';

describe('InfoCards', () => {
  it('renders InfoCards component', () => {
    render(<InfoCards />);
    expect(screen.queryByRole('article')).toBeNull();
  });
});
