import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../services/api';
import './AuthForm.css';

/**
 * AuthForm component.
 * Renders the landing / login screen matching the mockup in assets/mockups/landing.html.
 * Left panel: branding + hero content (desktop only).
 * Right panel: glass-panel form with tab toggle (Sign up / Log in).
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
   * Calls the appropriate API endpoint based on the active tab.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const action = isLogin ? loginUser : registerUser;
      const data = await action(email, password);
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
   * Switch between login and register modes.
   */
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="auth-page">
      {/* Left Panel — Hero (desktop only) */}
      <div className="auth-hero">
        <div className="auth-logo-text">SkillMap</div>

        <div>
          <h1 className="auth-headline">
            Know exactly what's{' '}
            <span className="text-gradient">missing</span> between you and your goal.
          </h1>
          <p className="auth-subtext">
            Bridge the gap in your career. Map your current abilities to future
            ambitions with professional precision.
          </p>

          {/* Use-case cards */}
          <div className="auth-use-cases">
            <div className="auth-use-case">
              <span className="auth-use-case-emoji">👨‍🍳</span>
              <div>
                <span className="auth-use-case-label">Chef</span>
                <span className="auth-use-case-arrow material-symbols-outlined">arrow_downward</span>
                <span className="auth-use-case-title">Manager</span>
              </div>
            </div>
            <div className="auth-use-case">
              <span className="auth-use-case-emoji">🎨</span>
              <div>
                <span className="auth-use-case-label">Designer</span>
                <span className="auth-use-case-arrow material-symbols-outlined">arrow_downward</span>
                <span className="auth-use-case-title">UX Lead</span>
              </div>
            </div>
            <div className="auth-use-case">
              <span className="auth-use-case-emoji">💻</span>
              <div>
                <span className="auth-use-case-label">Dev</span>
                <span className="auth-use-case-arrow material-symbols-outlined">arrow_downward</span>
                <span className="auth-use-case-title">Backend Engineer</span>
              </div>
            </div>
            <div className="auth-use-case">
              <span className="auth-use-case-emoji">🏥</span>
              <div>
                <span className="auth-use-case-label">Nurse</span>
                <span className="auth-use-case-arrow material-symbols-outlined">arrow_downward</span>
                <span className="auth-use-case-title">Project Manager</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="auth-stats">
            <div className="auth-stat">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", color: 'var(--accent2)' }}>timer</span>
              30s Analysis
            </div>
            <span className="auth-stat-dot" />
            <div className="auth-stat">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", color: 'var(--accent)' }}>public</span>
              Any Field
            </div>
            <span className="auth-stat-dot" />
            <div className="auth-stat">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", color: 'var(--yellow)' }}>check_circle</span>
              100% Free
            </div>
          </div>
        </div>

        <div className="auth-footer">© 2025 SkillMap. All rights reserved.</div>
      </div>

      {/* Right Panel — Form */}
      <div className="auth-form-panel">
        {/* Mobile logo */}
        <div className="auth-mobile-logo">
          <span className="auth-logo-text">SkillMap</span>
        </div>

        <div className="auth-form-container fade-in">
          {/* Tab switcher */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Sign up
            </button>
            <button
              type="button"
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Log in
            </button>
          </div>

          {/* Form */}
          <div className="auth-form">
            <h2 className="auth-title">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="auth-subtitle">
              {isLogin
                ? 'Enter your details to access your career map.'
                : 'Start mapping your career in under a minute.'}
            </p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="auth-email">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon material-symbols-outlined">mail</span>
                  <input
                    id="auth-email"
                    className="has-icon"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-group-row">
                  <label htmlFor="auth-password">Password</label>
                  {isLogin && (
                    <a href="#" className="form-link">Forgot password?</a>
                  )}
                </div>
                <div className="input-wrapper">
                  <span className="input-icon material-symbols-outlined">lock</span>
                  <input
                    id="auth-password"
                    className="has-icon"
                    type="password"
                    placeholder={isLogin ? '••••••••' : 'At least 6 characters'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner" />
                ) : isLogin ? (
                  'Log In'
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <div className="auth-divider-line" />
              <span className="auth-divider-text">OR</span>
              <div className="auth-divider-line" />
            </div>

            {/* Google button */}
            <button type="button" className="auth-google-btn">
              <svg viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Legal */}
          <p className="auth-legal">
            By continuing, you agree to our{' '}
            <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
