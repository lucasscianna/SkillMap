import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../services/api';

/**
 * AuthForm component.
 * Renders the landing / login screen matching the mockup in assets/mockups/landing.html.
 * Left panel: branding + hero content (desktop only).
 * Right panel: glass-panel form with tab toggle (Sign up / Log in).
 * Fully styled using Tailwind CSS classes.
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

  return (
    <div className="flex w-full min-h-screen relative z-10 bg-background text-on-background font-sans overflow-hidden">
      {/* Ambient background light */}
      <div className="ambient-light"></div>

      <div className="flex w-full min-h-screen relative z-10">
        {/* Left Panel — Hero (visible only on lg screens) */}
        <div className="hidden lg:flex flex-col w-1/2 p-10 justify-between border-r border-outline-variant/20 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1] opacity-30">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-container rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary-container rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-heading text-2xl font-bold tracking-tight text-on-surface">SkillMap</span>
          </div>

          <div className="max-w-xl my-auto">
            <h1 className="font-heading text-5xl font-extrabold mb-6 leading-tight">
              Know exactly what's <span className="text-gradient">missing</span> between you and your goal.
            </h1>
            <p className="font-sans text-lg text-on-surface-variant mb-12 max-w-md">
              Bridge the gap in your career. Map your current abilities to future ambitions with professional precision.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:border-primary-container/30 transition-colors">
                <span className="text-2xl">👨‍🍳</span>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Chef</span>
                  <span className="material-symbols-outlined text-primary-container text-sm">arrow_downward</span>
                  <span className="font-sans text-base font-semibold text-on-surface">Manager</span>
                </div>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:border-primary-container/30 transition-colors">
                <span className="text-2xl">🎨</span>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Designer</span>
                  <span className="material-symbols-outlined text-primary-container text-sm">arrow_downward</span>
                  <span className="font-sans text-base font-semibold text-on-surface">UX Lead</span>
                </div>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:border-primary-container/30 transition-colors">
                <span className="text-2xl">💻</span>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Dev</span>
                  <span className="material-symbols-outlined text-primary-container text-sm">arrow_downward</span>
                  <span className="font-sans text-base font-semibold text-on-surface">Backend Engineer</span>
                </div>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:border-primary-container/30 transition-colors">
                <span className="text-2xl">🏥</span>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Nurse</span>
                  <span className="material-symbols-outlined text-primary-container text-sm">arrow_downward</span>
                  <span className="font-sans text-base font-semibold text-on-surface">Project Manager</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 border-t border-outline-variant/20 pt-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
                <span className="font-sans text-base text-on-surface-variant">30s Analysis</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
                <span className="font-sans text-base text-on-surface-variant">Any Field</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-sans text-base text-on-surface-variant">100% Free</span>
              </div>
            </div>
          </div>

          <div className="font-sans text-sm text-outline">
            © 2026 SkillMap. All rights reserved.
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10 relative">
          <div className="absolute top-6 left-6 flex lg:hidden items-center gap-3">
            <span className="font-heading text-2xl font-bold tracking-tight text-on-surface">SkillMap</span>
          </div>

          <div className="w-full max-w-md">
            <div className="glass-panel rounded-2xl p-8 lg:p-10">
              {/* Tab Switcher */}
              <div className="bg-surface-container-low p-1 rounded-lg flex mb-8 border border-outline-variant/10">
                <button
                  onClick={() => { setIsLogin(false); setError(''); }}
                  className={`flex-1 py-2 px-4 rounded-md font-sans text-xs font-semibold uppercase tracking-wider transition-colors ${
                    !isLogin ? 'bg-surface-variant text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  id="tab-signup"
                >
                  Sign up
                </button>
                <button
                  onClick={() => { setIsLogin(true); setError(''); }}
                  className={`flex-1 py-2 px-4 rounded-md font-sans text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isLogin ? 'bg-surface-variant text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  id="tab-login"
                >
                  Log in
                </button>
              </div>

              {/* Title */}
              <div className="mb-8">
                <h2 className="font-heading text-3xl font-semibold mb-2" id="form-title">
                  {isLogin ? 'Welcome back' : 'Create account'}
                </h2>
                <p className="font-sans text-sm text-on-surface-variant">
                  {isLogin ? 'Enter your details to access your career map.' : 'Start mapping your career in under a minute.'}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-error-container border border-error/20 text-error text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline text-xl">mail</span>
                    </span>
                    <input
                      className="custom-input focus:custom-input-focus block w-full pl-10 pr-3 py-3 rounded-lg font-sans text-base placeholder-outline-variant"
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block" htmlFor="password">
                      Password
                    </label>
                    {isLogin && (
                      <a className="font-sans text-xs font-semibold uppercase tracking-wider text-primary-container hover:text-primary transition-colors" href="#">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline text-xl">lock</span>
                    </span>
                    <input
                      className="custom-input focus:custom-input-focus block w-full pl-10 pr-10 py-3 rounded-lg font-sans text-base placeholder-outline-variant"
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  className="w-full bg-gradient-btn text-white font-sans text-base font-semibold py-3 rounded-lg shadow-md transition-all duration-200 transform active:scale-[0.98] mt-2 cursor-pointer flex justify-center items-center"
                  id="submit-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <span className="spinner"></span> : isLogin ? 'Log In' : 'Sign Up'}
                </button>
              </form>

              {/* Divider */}
              <div className="mt-8 mb-6 flex items-center">
                <div className="flex-grow h-px bg-outline-variant/30"></div>
                <span className="px-4 font-sans text-xs font-semibold uppercase tracking-wider text-outline-variant">OR</span>
                <div className="flex-grow h-px bg-outline-variant/30"></div>
              </div>

              {/* Google Button */}
              <button
                className="w-full bg-surface-container-low border border-outline-variant/40 hover:bg-surface-container-high hover:border-outline-variant text-on-surface font-sans text-base py-3 rounded-lg transition-colors flex items-center justify-center gap-3 cursor-pointer"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                Continue with Google
              </button>
            </div>

            <p className="text-center mt-6 font-sans text-sm text-outline-variant">
              By continuing, you agree to our <a className="text-on-surface-variant underline hover:text-on-surface" href="#">Terms of Service</a> and <a className="text-on-surface-variant underline hover:text-on-surface" href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
