import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post('https://us-central1-mbtcandidate.cloudfunctions.net/posts/hgalarza', { title, text });
      navigate('/');
    } catch (error) {
      setError('Failed to add blog post.');
    }
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <h2>Add New Blog</h2>
      <Form onSubmit={handleAddBlog}>
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
          Add Blog
        </Button>
      </Form>
    </>
  );
};

export default AddBlog;
