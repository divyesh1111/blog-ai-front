import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Admin from './Admin';
import PublicBlogs from './PublicBlogs';
import Login from './Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <div className="max-w-5xl mx-auto p-6">
        <nav className="mb-8 flex space-x-6 text-lg font-semibold">
          <Link to="/" className="hover:text-blue-600">Public Blogs</Link>
          {token ? (
            <>
              <Link to="/admin" className="hover:text-blue-600">Admin Panel</Link>
              <button
                onClick={() => setToken(null)}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-600">Admin Login</Link>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<PublicBlogs />} />
          <Route
            path="/admin"
            element={token ? <Admin token={token} /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
