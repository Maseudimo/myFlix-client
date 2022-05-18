import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export function NavigationView({ user }) {
    
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    if (typeof window == "profile") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand className="navbar-logo" href="/">Mehos MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href="/profile">{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => {
                onLoggedOut()
              }}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Login</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Register</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}