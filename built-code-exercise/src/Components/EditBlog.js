import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
    fetchBlogPost();
  }, []);

  const fetchBlogPost = async () => {
    try {
      const response = await axios.get(`https://us-central1-mbtcandidate.cloudfunctions.net/posts/hgalarza/${id}`);
      const { title, text } = response.data.response;
      setTitle(title);
      setText(text);
    } catch (error) {
      setError('Failed to fetch blog post.');
    }
  }; 
  


  const handleEditBlog = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.put(`https://us-central1-mbtcandidate.cloudfunctions.net/posts/hgalarza/${id}`, { title, text });
      navigate('/');
    } catch (error) {
      setError('Failed to edit blog post.');
    }
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <h2>Edit Blog</h2>
      <Form onSubmit={handleEditBlog}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter blog content"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default EditBlog;
