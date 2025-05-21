import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        blogs.map(blog => (
          <div key={blog._id} className="mb-6 p-4 border rounded shadow max-w-4xl">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="whitespace-pre-wrap mb-2">{blog.content}</p>
            <small className="text-gray-500">
              Created at: {new Date(blog.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}
