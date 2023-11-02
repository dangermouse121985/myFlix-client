import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router';

export const UserView = ({ user }) => {
  const [userInfo, setUserInfo] = useState('');
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(
      `https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com/users/${user.username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const userFromApi = {
          username: data.username,
        };
        setUserInfo(userFromApi);
      });
  }, [token]);

  const updateUser = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      birth: birthday,
      username: username,
      password: password,
    };

    fetch(
      `https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com/users/${user.username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        method: 'PUT',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const userFromApi = {
          username: data.username,
        };
        setUserInfo(userFromApi);
      });
  };

  console.log(userInfo);
  const deregister = (e) => {
    e.preventDefault();
    fetch(
      `https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com/users/${user.username}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  birth = new Date(user.birth);
  birthString = birth.toLocaleDateString('sv-SE', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.first_name}
            value={firstName}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.last_name}
            value={lastName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" defaultValue={user.email} value={email} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control type="date" value={birthday}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.username}
            value={username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="primary" onClick={deregister}>
          Delete User
        </Button>
      </Form>
    </>
  );
};
