import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

import { Container, Card, Row, Col, Button } from 'react-bootstrap';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmail('Email must be valid');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://mehos-myflix-app.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successfull!')
          window.open('/', '_self');
        })
        .catch(e => {
          console.log('error registering the user')
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col med={4}>
          <Card>
            <Card.Body>
              <Card.Title>Sign up here</Card.Title>
              <Form className="register-form">
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label className="titles">Username: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="titles">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="titles">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailErr && <p>{emailErr}</p>}
                  
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBirthdate">
                  <Form.Label className="titles">Birth date: </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="yyyy/mm/dd"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="custom-btn"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign me up!
                </Button>

                
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
};
