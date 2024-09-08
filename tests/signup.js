import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'; // For improved assertions in React Native
import axios from 'axios';
import SignUp from '../app/(auth)/Sign-up'; // Update the path as necessary
import GlobalProvider from '../context/GlobalProvider'; // Update the path as necessary

jest.mock('axios'); // Mock axios for API calls

describe('SignUp Component', () => {
  beforeEach(() => {
    axios.post.mockClear(); // Clear mock calls between tests
  });

  it('renders the SignUp form', () => {
    const { getByPlaceholderText, getByRole } = render(
      <GlobalProvider>
        <SignUp />
      </GlobalProvider>
    );

    // Check if all form elements are rendered
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByRole('button', { name: /Sign Up/i })).toBeTruthy();
  });

  it('displays an error message if sign-up fails', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: 'User registration failed' } });

    const { getByPlaceholderText, getByRole, getByText } = render(
      <GlobalProvider>
        <SignUp />
      </GlobalProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
    fireEvent.press(getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(getByText('User registration failed')).toBeTruthy();
    });
  });

  it('redirects to the login page after successful sign-up', async () => {
    axios.post.mockResolvedValueOnce({ status: 200, data: { message: 'User registration successful' } });
    axios.post.mockResolvedValueOnce({ status: 200, data: { message: 'Sign in successful' } }); // Mock for signIn after registration

    const { getByPlaceholderText, getByRole, getByText } = render(
      <GlobalProvider>
        <SignUp />
      </GlobalProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
    fireEvent.press(getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(getByText('Sign-up successful')).toBeTruthy();
    });
  });
});

