import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import PublicBlogs from './PublicBlogs';
import BlogDetails from './BlogDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { startKeepAlive } from "./keepAlive";



function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token');
    }
  }, [token]);


  useEffect(() => {
    startKeepAlive();
  }, []);



  return (
    <Router>
      {/* Full height flex column layout */}
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Main content that grows */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="mb-8 flex flex-wrap gap-4 text-lg font-semibold">
            <Link to="/" className="hover:text-blue-600">Public Blogs</Link>
          </nav>

          <Routes>
            <Route path="/" element={<PublicBlogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
