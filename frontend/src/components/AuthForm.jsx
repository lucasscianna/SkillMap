import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../services/api';
import './AuthForm.css';

/**
 * AuthForm component.
 * Handles both sign-up and log-in flows.
 * On success, stores the JWT token in localStorage and redirects to /profile.
 */
function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle form submission.
   * Calls the appropriate API endpoint based on isLogin state.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const action = isLogin ? loginUser : registerUser;
      const data = await action(email, password);

      // Store token and redirect
      localStorage.setItem('skillmap_token', data.token);
      navigate('/profile');
    } catch (err) {
      const message =
        err.response?.data?.error || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle between login and register modes.
   * Clears any existing error message.
   */
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container fade-in">
        {/* Branding */}
        <div className="auth-header">
          <div className="auth-logo">
            <span className="auth-logo-icon">◆</span>
            <span className="auth-logo-text">SkillMap</span>
          </div>
          <p className="auth-tagline">
            Discover your skill gaps. Get a roadmap to close them.
          </p>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-title">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>

          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder={isLogin ? 'Enter your password' : 'At least 6 characters'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner" />
            ) : isLogin ? (
              'Log in'
            ) : (
              'Sign up'
            )}
          </button>
        </form>

        {/* Toggle */}
        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button type="button" className="auth-toggle-btn" onClick={toggleMode}>
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
