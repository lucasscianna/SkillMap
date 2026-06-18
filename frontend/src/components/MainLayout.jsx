import SideNavBar from './SideNavBar';

/**
 * MainLayout component.
 * Layout wrapper for authenticated pages, containing the sidebar navigation.
 */
function MainLayout({ children }) {
  return (
    <div className="flex w-full min-h-screen bg-background text-on-background font-sans overflow-x-hidden">
      {/* Persistent Sidebar (desktop) */}
      <SideNavBar />

      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-[280px] md:w-[calc(100%-280px)] min-h-screen relative overflow-x-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
