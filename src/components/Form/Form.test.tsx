import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Context } from '../../context';
import { ContextType } from '../../interfaces';
import FormComp from './Form';
import { useNavigate } from 'react-router-dom';
import { images, CHOISE } from '../../contants';
import * as ApiModule from '../../api';

const mockNavigate = jest.fn();

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: jest.fn()
}));

// Mock getImages API call
jest.mock('../../api', () => ({
  getImages: jest.fn()
}));

// Wrap component in a function to provide context
const renderWithProviders = (
  ui: React.ReactElement,
  { providerProps, ...renderOptions }: { providerProps: ContextType; [key: string]: any }
) => {
  return render(<Context.Provider value={providerProps}>{ui}</Context.Provider>, renderOptions);
};

// Mock Context
const mockSetImages = jest.fn();
const providerProps: ContextType = {
  setImages: mockSetImages
};

describe('Form Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useNavigate).mockImplementation(() => mockNavigate);
    (ApiModule.getImages as jest.Mock).mockResolvedValue({ photos: images });
  });

  it('should display validation errors for empty fields after submission', async () => {
    renderWithProviders(<FormComp />, { providerProps });
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findAllByText(/required/i)).toHaveLength(3);
  });

  it('should show custom topic field when "Other" is selected', () => {
    renderWithProviders(<FormComp />, { providerProps });
    userEvent.selectOptions(screen.getByLabelText('Topic select'), 'Other');
    expect(screen.getByPlaceholderText(/enter your topic/i)).toBeInTheDocument();
  });

  it('submits the form correctly and navigates', async () => {
    renderWithProviders(<FormComp />, { providerProps });
    // Fill in the form fields
    userEvent.type(screen.getByPlaceholderText('Name'), 'John');
    userEvent.type(screen.getByPlaceholderText('Surname'), 'Doe');
    userEvent.selectOptions(screen.getByLabelText('Topic select'), 'Travel');
    // Submit the form
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // Wait for the API call and navigation to occur
    await waitFor(() => {
      expect(ApiModule.getImages).toHaveBeenCalledWith('Travel');
    });
    await waitFor(() => {
      expect(mockSetImages).toHaveBeenCalledWith({
        photos: images,
        name: 'John',
        surname: 'Doe'
      });
    });
    await waitFor(() => {
      expect(useNavigate()).toHaveBeenCalledWith(CHOISE);
    });
  });
});
