import React, { useState, useEffect } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const API_BASE = process.env.REACT_APP_API_URL;

const Admin = ({ token, setToken }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const blogsPerPage = 7;
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchBlogs();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editId) {
        await axios.put(`${API_BASE}/blogs/${editId}`, { title, content }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Blog updated successfully!');
      } else {
        await axios.post(`${API_BASE}/blogs`, { title, content }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Blog created successfully!');
      }
      setTitle('');
      setContent('');
      setEditId(null);
      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog');
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditId(blog._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`${API_BASE}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Blog deleted successfully!');
      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete blog');
    }
  };

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const paginatedBlogs = blogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{editId ? 'Edit Blog' : 'Create a New Blog'}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Blog Content"
          className="w-full border px-3 py-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {editId ? 'Update Blog' : 'Submit Blog'}
        </button>
      </form>

      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div>
        <h3 className="text-xl font-bold mb-2">All Blogs</h3>

        {loading ? (
          // Show 3 skeleton cards while loading
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="border p-4 mb-4 rounded shadow-sm bg-white">
              <Skeleton height={20} width={200} className="mb-2" />
              <Skeleton height={15} width={`60%`} className="mb-2" />
              <Skeleton height={15} width={`40%`} />
            </div>
          ))
        ) : (
          paginatedBlogs.map((blog) => (
            <div key={blog._id} className="border p-4 mb-4 rounded shadow-sm bg-white">
              <div className="flex justify-between">
                <h4 className="font-bold text-lg">{blog.title}</h4>
                <small className="text-gray-500">
                  Created at: {new Date(blog.createdAt).toLocaleString()}
                </small>
              </div>
              <div className="mt-2 space-x-2">
                <button onClick={() => handleEdit(blog)} className="text-blue-600 hover:underline">
                  <MdModeEdit className="inline text-xl border border-blue-500 p-1 rounded-lg" />
                </button>
                <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:underline">
                  <RiDeleteBin6Fill className="inline text-xl border border-red-600 p-1 rounded-lg" />
                </button>
              </div>
            </div>
          ))
        )}

        {totalPages > 1 && !loading && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
