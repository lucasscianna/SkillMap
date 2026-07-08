import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import AuthForm from '../components/AuthForm';

// Mock API requests
vi.mock('../services/api', () => ({
  registerUser: vi.fn(),
  loginUser: vi.fn(),
}));

describe('AuthForm Component', () => {
  it('renders email and password inputs and a submit button', () => {
    render(
      <BrowserRouter>
        <AuthForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
    const submitBtn = screen.getByRole('button', { name: 'Log In'});
    expect(submitBtn).toBeInTheDocument();
  });

  it('toggles between log in and sign up tabs', () => {
    render(
      <BrowserRouter>
        <AuthForm />
      </BrowserRouter>
    );

    // Should display 'Welcome back' by default
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();

    // Toggle to Sign Up
    const signUpTab = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(signUpTab);

    // Title should update
    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
  });
});
