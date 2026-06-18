import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

/**
 * Navbar component.
 * Persistent horizontal navigation header for authenticated routes.
 * Styled using Tailwind utility classes with a glassmorphic design and micro-animations.
 */
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Handle user logout.
   * Clears the token from localStorage and redirects to login/landing.
   */
  const handleLogout = () => {
    localStorage.removeItem('skillmap_token');
    navigate('/');
  };

  /**
   * Check if the given route is currently active.
   * @param {string} path Route path
   * @returns {boolean} True if active
   */
  const isActive = (path) => currentPath === path;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-outline-variant/10 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between">
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Brand Logo with blue dot */}
        <Link to="/analysis" className="flex items-center gap-2 select-none group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center shadow-lg shadow-primary-container/20 group-hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              hub
            </span>
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-on-surface">
            SkillMap<span className="text-primary font-black animate-pulse">.</span>
          </span>
        </Link>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-on-surface p-2 hover:bg-surface-variant/40 rounded-lg cursor-pointer"
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/analysis"
          className={`font-sans text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
            isActive('/analysis')
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          New Analysis
        </Link>
        <Link
          to="/history"
          className={`font-sans text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
            isActive('/history')
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          History
        </Link>
        <Link
          to="/profile"
          className={`font-sans text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
            isActive('/profile')
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Profile
        </Link>
      </nav>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <nav className="flex md:hidden flex-col gap-4 mt-4 pt-4 border-t border-outline-variant/10">
          <Link
            to="/analysis"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-sans text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
              isActive('/analysis') ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            New Analysis
          </Link>
          <Link
            to="/history"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-sans text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
              isActive('/history') ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            History
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-sans text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
              isActive('/profile') ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            Profile
          </Link>
        </nav>
      )}

      {/* Action Area */}
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger or direct actions */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-variant/40 hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-all duration-200 cursor-pointer font-sans text-xs font-semibold uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
