import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
  it('renders input in SearchBar component', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Enter the name of the character...')).toHaveClass(
      'input-text'
    );
  });

  it('input has focus', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('input')).toHaveFocus();
  });

  it('input has value', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('input')).toHaveValue('');
    userEvent.type(screen.getByTestId('input'), 'rick');
    expect(screen.getByTestId('input')).toHaveValue('rick');
  });

  it('renders button in SearchBar component', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('button')).toHaveClass('button');
  });

  it('button is clicked', () => {
    render(<SearchBar addSearchQuery={() => {}} />);
    expect(screen.getByTestId('input')).toHaveValue('');
    userEvent.type(screen.getByTestId('input'), 'rick');
    fireEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('input')).toHaveValue('');
  });

  it('input value is saved', () => {
    const saveValueHandler = jest.fn();

    render(<SearchBar addSearchQuery={saveValueHandler} />);
    expect(screen.getByTestId('input')).toHaveValue('');
    userEvent.type(screen.getByTestId('input'), 'rick');
    expect(saveValueHandler).not.toBeCalled();
    fireEvent.keyUp(screen.getByTestId('input'), { code: 'Enter' });
    expect(saveValueHandler).toBeCalled();
  });
});
