import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';

const AddBlogForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post('https://us-central1-mbtcandidate.cloudfunctions.net/posts/hgalarza', {
        title,
        text,
      });
      setTitle('');
      setText('');
      // Show success message or perform any other actions
    } catch (error) {
      setError('Failed to add the blog post.');
    }
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="text">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" value={text} onChange={(e) => setText(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Add New</Button>
      </Form>
    </>
  );
};

export default AddBlogForm;
