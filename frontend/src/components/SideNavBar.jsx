import { useNavigate, useLocation, Link } from 'react-router-dom';

/**
 * SideNavBar component.
 * Renders the persistent navigation drawer on the left side of the dashboard.
 * Styled using Tailwind utility classes matching the mockup.
 */
function SideNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('skillmap_token');
    navigate('/');
  };

  const currentPath = location.pathname;

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] bg-surface-container-low border-r border-outline-variant/10 shadow-sm flex-col py-6 px-4 z-50 bg-[#111927]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-container/20">
          <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
            hub
          </span>
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary leading-none">SkillMap</h1>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant mt-1">
            Career Growth
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-2 mb-8">
        <Link
          to="/analysis"
          className="w-full bg-gradient-to-r from-primary-container to-secondary-container text-white font-sans text-xs font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          Analyze Skills
        </Link>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-1 flex flex-col gap-2">
        <span className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200 rounded-full cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider">Dashboard</span>
        </span>

        <Link
          to="/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-full transition-transform ${
            currentPath === '/profile'
              ? 'bg-secondary-container text-white border-l-4 border-primary font-bold scale-[0.98]'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: currentPath === '/profile' ? "'FILL' 1" : undefined }}>
            person
          </span>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider">Profile</span>
        </Link>

        <Link
          to="/analysis"
          className={`flex items-center gap-3 px-4 py-3 rounded-full transition-transform ${
            currentPath === '/analysis'
              ? 'bg-secondary-container text-white border-l-4 border-primary font-bold scale-[0.98]'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: currentPath === '/analysis' ? "'FILL' 1" : undefined }}>
            auto_awesome
          </span>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider">Analysis</span>
        </Link>

        <span className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200 rounded-full cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider">Settings</span>
        </span>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-outline-variant/10">
        <a
          href="#"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error hover:bg-error-container/10 transition-colors duration-200 rounded-full"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider">Logout</span>
        </a>
      </div>
    </aside>
  );
}

export default SideNavBar;
