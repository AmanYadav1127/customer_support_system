import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import LoginPage from './LoginPage';
import HomePage from './HomePage';
import TicketsPage from './TicketsPage';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Check session on app load
  useEffect(() => {

    fetch('http://localhost:8080/api/auth/me', {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });

  }, []);

  // Login
  const handleLogin = (username, password) => {

    const formData = new URLSearchParams();

    formData.append("username", username);
    formData.append("password", password);

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      credentials: 'include',

      body: formData
    })
      .then(res => {

        if (res.ok) {

          setIsAuthenticated(true);
          setLoginError(null);

        } else {

          setLoginError('Invalid credentials');
        }
      })
      .catch(() => {
        setLoginError('Login failed');
      });
  };

  // Logout
  const handleLogout = () => {

    fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(() => {
        setIsAuthenticated(false);
      });
  };

  return (

    <Router>

      <Routes>

        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/home" replace />
              : <LoginPage
                  onLogin={handleLogin}
                  error={loginError}
                />
          }
        />

        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/home" : "/login"}
              replace
            />
          }
        />

        <Route
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/tickets" element={<TicketsPage />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </Router>
  );
}

export default App;