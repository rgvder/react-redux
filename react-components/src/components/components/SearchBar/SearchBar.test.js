import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('renders SearchBar component', () => {
    const filterItems = jest.fn();

    render(<SearchBar filterItems={filterItems} />);

    const input = screen.queryByPlaceholderText(/Search/i);

    fireEvent.change(input, { target: { value: 'test' } });
    cleanup();

    expect(window.localStorage.setItem).toHaveBeenCalled();
    expect(window.localStorage.setItem).toHaveBeenCalledWith('value', 'test');
  });
});
