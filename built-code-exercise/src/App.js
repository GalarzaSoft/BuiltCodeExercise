import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import BlogList from './Components/BlogList';
import AddBlog from './Components/AddBlog';
import ViewBlog from './Components/ViewBlog';
import EditBlog from './Components/EditBlog';

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">Example Blog</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/add">Add New</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/add" element={<AddBlog />} />
          <Route path="/view/:id" element={<ViewBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
