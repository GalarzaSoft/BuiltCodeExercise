import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogPost();
  }, []);

  const fetchBlogPost = async () => {
    try {
      const response = await axios.get(`https://us-central1-mbtcandidate.cloudfunctions.net/posts/hgalarza/${id}`);
      setBlog(response.data.response);
    } catch (error) {
      setError('Failed to fetch blog post.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://us-central1-mbtcandidate.cloudfunctions.net/posts/hgalarza/${id}`);
      navigate('/');
    } catch (error) {
      setError('Failed to delete blog post.');
    }
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  const { title, text } = blog;

  return (
    <>
      <h2>{title}</h2>
      <p>{text}</p>
      <Button variant="primary" onClick={() => navigate(`/edit/${id}`)}>Edit</Button>{' '}
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </>
  );
};

export default ViewBlog;
