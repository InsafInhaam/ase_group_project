import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Login from '../Login';

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

describe('Login Component', () => {
  it('displays error when submitting empty form', () => {
    const mockDispatch = jest.fn();
    render(
      <Provider store={{ dispatch: mockDispatch }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Login'));

    expect(toast.error).toHaveBeenCalledWith('Please enter a valid email address');
    expect(toast.error).toHaveBeenCalledWith('Please enter a password');
  });

  it('displays success message and redirects on successful login', async () => {
    const mockDispatch = jest.fn();
    const mockHistory = jest.fn();

    render(
      <Provider store={{ dispatch: mockDispatch }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password123' },
    });

    // Mock fetch response
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        token: 'fakeToken',
        user: { id: 1, name: 'John' },
        message: 'Login successful',
      }),
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('jwt', 'fakeToken');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify({ id: 1, name: 'John' })
      );
      expect(toast.success).toHaveBeenCalledWith('Login successful');
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGIN', payload: { id: 1, name: 'John' } });
      expect(mockHistory).toHaveBeenCalledWith('/');
    });
  });

  // ... Other test cases

  // Clean up mock fetch after all tests
  afterAll(() => {
    global.fetch.mockRestore();
  });
});
