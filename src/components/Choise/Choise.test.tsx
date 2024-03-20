import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Context } from '../../context';
import { ContextType } from '../../interfaces';
import Choice from './Choise';
import { useNavigate } from 'react-router-dom';
import { SEARCH, RESULTS, images } from '../../contants';
import { act } from 'react-dom/test-utils';

const mockNavigate = jest.fn();

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: jest.fn()
}));

// Wrap component in a function to provide context
const renderWithProviders = (
  ui: React.ReactElement,
  { providerProps, ...renderOptions }: { providerProps: ContextType; [key: string]: any }
) => {
  return render(<Context.Provider value={providerProps}>{ui}</Context.Provider>, renderOptions);
};

describe('Choice Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();

    jest.mocked(useNavigate).mockImplementation(() => mockNavigate);
  });

  it('renders correctly', () => {
    const providerProps: ContextType = {
      images,
      onAccept: jest.fn()
    };
    renderWithProviders(<Choice />, { providerProps });
    expect(screen.getByAltText('img')).toHaveAttribute('src', images[0].src.medium);
  });

  it('navigates to search when there are no more images on reject', () => {
    const providerProps: ContextType = {
      images: [images[0]],
      onAccept: jest.fn()
    };
    renderWithProviders(<Choice />, { providerProps });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: 'Reject' }));
    });
    expect(mockNavigate).toHaveBeenCalledWith(SEARCH);
  });

  it('increments the index on reject when there are more images', () => {
    const providerProps: ContextType = {
      images,
      onAccept: jest.fn()
    };
    renderWithProviders(<Choice />, { providerProps });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: 'Reject' }));
    });
    expect(screen.getByAltText('img')).toHaveAttribute('src', images[1].src.medium);
  });

  it('calls onAccept and navigates to results on accept', () => {
    const onAcceptMock = jest.fn();
    const providerProps: ContextType = {
      images,
      onAccept: onAcceptMock
    };
    renderWithProviders(<Choice />, { providerProps });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: 'Accept' }));
    });
    expect(onAcceptMock).toHaveBeenCalledWith(0);
    expect(mockNavigate).toHaveBeenCalledWith(RESULTS);
  });
});
