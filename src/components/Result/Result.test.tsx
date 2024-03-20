import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Result from './Result';

// Mock the useContext hook to return custom context values
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}));

describe('Result Component', () => {
  const renderWithContext = (contextValue: any) => {
    (React.useContext as jest.Mock).mockReturnValue(contextValue);
    render(<Result />);
  };

  it('renders the component with name, surname, and selected image', () => {
    const contextValue = {
      name: 'John',
      surname: 'Doe',
      selected: {
        src: { medium: 'https://example.com/image.jpg' },
        alt: 'Example Image'
      }
    };

    renderWithContext(contextValue);

    expect(screen.getByAltText('Example Image')).toBeInTheDocument();
    expect(screen.getByAltText('Example Image')).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('handles missing context values gracefully', () => {
    const contextValue = {}; // Empty context for this test scenario
    renderWithContext(contextValue);

    expect(screen.getByRole('img')).not.toHaveAttribute('src'); // Checks for an empty image src attribute
    expect(screen.getByRole('img')).not.toHaveAttribute('alt'); // Checks for an empty alt text
  });
});
