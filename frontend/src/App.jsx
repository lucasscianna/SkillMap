import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ProfilePage from './pages/ProfilePage';
import AnalysisPage from './pages/AnalysisPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import ExportPage from './pages/ExportPage';

/**
 * Root application component.
 * Configures the router and defines public and protected routes.
 */
function App() {
  /**
   * Check if the user is authenticated.
   * @returns {boolean} True if token exists
   */
  const isAuthenticated = () => {
    return !!localStorage.getItem('skillmap_token');
  };

  /**
   * Route protector wrapper.
   * Redirects to the landing page if the user is not authenticated.
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
        {/* Public Landing & Authentication route */}
        <Route path="/" element={<AuthForm />} />

        {/* Protected Dashboard/Profile Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <AnalysisPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results/:id"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/export/:id"
          element={
            <ProtectedRoute>
              <ExportPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
