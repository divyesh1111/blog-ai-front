import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_BASE}/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError("Blog not found.");
      }
    };

    fetchBlog();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-2">
        Created at: {new Date(blog.createdAt).toLocaleString()}
      </p>
      <div className="whitespace-pre-wrap">{blog.content}</div>
    </div>
  );
}
