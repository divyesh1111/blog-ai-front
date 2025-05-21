import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL;

export default function PublicBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/blogs`);
      setBlogs(res.data);
    } catch {
      setError('Failed to fetch blogs');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Public Blogs</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
      )}

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blogs/${blog._id}`}
              className="p-4 border border-green-500 rounded shadow bg-white hover:bg-green-100 hover:shadow-2xl transition duration-500 block"
            >
              <h2 className="text-xl font-semibold mb-2 text-black">
                {blog.title}
              </h2>
              <p className="whitespace-pre-wrap mb-2 text-gray-400">
                {blog.content.split(' ').slice(0, 5).join(' ')}...
              </p>
              <small className="text-gray-500">
                Created at: {new Date(blog.createdAt).toLocaleString()}
              </small>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
