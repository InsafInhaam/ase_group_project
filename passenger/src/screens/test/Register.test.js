// import React from 'react';
// import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import Register from '../Register';

// jest.mock('react-hot-toast', () => ({
//   error: jest.fn(),
//   success: jest.fn(),
// }));

// describe('Register Component', () => {
//   it('displays error when submitting empty form', () => {
//     render(
//       <MemoryRouter>
//         <Register />
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByText('Sign Up'));

//     expect(toast.error).toHaveBeenCalledWith('Please fill all required fields');
//   });

//   it('displays error for invalid email', () => {
//     render(
//       <MemoryRouter>
//         <Register />
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByPlaceholderText('Enter email'), {
//       target: { value: 'invalid-email' },
//     });
//     fireEvent.click(screen.getByText('Sign Up'));

//     expect(toast.error).toHaveBeenCalledWith('Invalid email address');
//   });

//   it('displays error for short password', () => {
//     render(
//       <MemoryRouter>
//         <Register />
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByPlaceholderText('Enter email'), {
//       target: { value: 'valid@example.com' },
//     });
//     fireEvent.change(screen.getByPlaceholderText('Enter password'), {
//       target: { value: 'short' },
//     });
//     fireEvent.click(screen.getByText('Sign Up'));

//     expect(toast.error).toHaveBeenCalledWith('Password must be at least 8 characters');
//   });

//   it('displays error for password without special characters', () => {
//     render(
//       <MemoryRouter>
//         <Register />
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByPlaceholderText('Enter email'), {
//       target: { value: 'valid@example.com' },
//     });
//     fireEvent.change(screen.getByPlaceholderText('Enter password'), {
//       target: { value: 'password123' },
//     });
//     fireEvent.click(screen.getByText('Sign Up'));

//     expect(toast.error).toHaveBeenCalledWith('Password must have special characters');
//   });

//   it('displays success message and redirects on successful registration', async () => {
//     render(<Register />, { wrapper: MemoryRouter });
  
//     fireEvent.change(screen.getByLabelText('Full name'), {
//       target: { value: 'John Doe' },
//     });
//     fireEvent.change(screen.getByLabelText('Email address'), {
//       target: { value: 'valid@example.com' },
//     });
//     fireEvent.change(screen.getByLabelText('Password'), {
//       target: { value: 'password@123' },
//     });
  
//     await act(async () => {
//       fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
//       await waitFor(() => {
//         expect(toast.success).toHaveBeenCalledWith('Registration successful');
//       });
//     });
//   });
  

//   // ... Other test cases

//   // Clean up mock fetch after all tests
//   afterAll(() => {
//     global.fetch.mockRestore();
//   });
// });
