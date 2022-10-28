import { fireEvent, render, screen } from '@testing-library/react';
import Form from './Form';
import userEvent from '@testing-library/user-event';

describe('Form', () => {
  it('renders FormPage component', () => {
    render(<Form />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
  });

  it('renders nameInput component', () => {
    render(<Form />);
    expect(screen.getByTestId('name')).toHaveClass('input');
  });

  it('submit button is disabled', () => {
    render(<Form />);
    expect(screen.getByTestId('submit')).toBeDisabled();
    userEvent.type(screen.getByTestId('name'), 'fhj');
    expect(screen.getByTestId('submit')).not.toBeDisabled();
  });

  it('name input has focus', () => {
    render(<Form />);
    expect(screen.getByTestId('name')).not.toHaveFocus();
    screen.getByTestId('name').focus();
    expect(screen.getByTestId('name')).toHaveFocus();
  });

  it('name input has value', () => {
    render(<Form />);
    expect(screen.getByTestId('name')).toHaveValue('');
    userEvent.type(screen.getByTestId('name'), 'fhj');
    expect(screen.getByTestId('name')).toHaveValue('fhj');
  });

  it('validate email', () => {
    render(<Form />);
    userEvent.type(screen.getByTestId('email'), 'fhj');
    fireEvent.click(screen.getByTestId('submit'));
    expect(
      screen.getByText(/The data you entered is not in the right format/i)
    ).toBeInTheDocument();
  });

  it('color input is checked', () => {
    render(<Form />);
    expect(screen.getByTestId('colorInput')).not.toBeChecked();
    fireEvent.click(screen.getByTestId('colorInput'));
    expect(screen.getByTestId('colorInput')).toBeChecked();
  });
});
