import { render, screen } from '@testing-library/react';
import { InfoCard } from './InfoCard';

describe('InfoCard', () => {
  it('renders InfoCard component', () => {
    render(<InfoCard />);
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
