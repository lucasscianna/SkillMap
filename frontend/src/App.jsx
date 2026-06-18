import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';

/**
 * Root application component.
 * Sets up routing for all pages.
 * Protected routes redirect to login if no token is found.
 */
function App() {
  /**
   * Check if the user is authenticated.
   * @returns {boolean}
   */
  const isAuthenticated = () => {
    return !!localStorage.getItem('skillmap_token');
  };

  /**
   * Wrapper for routes that require authentication.
   * Redirects to the login page if no token is found.
   */
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route — login / register */}
        <Route path="/" element={<AuthForm />} />

        {/* Protected routes — will be added in Sprint 2 */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <div className="container page">
                <h1>Profile — Coming in Sprint 2</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <div className="container page">
                <h1>Analysis — Coming in Sprint 2</h1>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
