import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://us-central1-mbtcandidate.cloudfunctions.net/posts/hgalarza');
      setPosts(response.data.response);
    } catch (error) {
      setError('Failed to fetch blog posts.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://us-central1-mbtcandidate.cloudfunctions.net/posts/hgalarza/${id}`);
      fetchPosts();
    } catch (error) {
      setError('Failed to delete blog post.');
    }
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <Link to="/add">
        <Button variant="primary" className="mb-3">Add New</Button>
      </Link>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} className="mb-3">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.text}</Card.Text>
              <div className="d-flex justify-content-end">

              <Button variant="primary" onClick={() => navigate(`/edit/${post.id}`)}>Edit</Button>{' '}
      <Button variant="danger" onClick={handleDelete(post.id)}>Delete</Button>
            </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No blog posts available.</p>
      )}
    </>
  );
};

export default BlogList;
