import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router';

export const UserView = ({ user }) => {
  const [userInfo, setUserInfo] = useState('');
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birth);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);

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

  const updateUser = (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      birth: birthday,
      username: username,
      password: password,
    };

    console.log(firstName);
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
    ).then((response) => {
      if (response.ok) {
        alert('User Info Successfully Updated');
        window.location.href = '/login';
      } else {
        alert('User Update Failed');
      }
    });
  };

  const deregister = (e) => {
    e.preventDefault();
    let response = confirm(
      'Are you sure, you want to delete this account. This acction is not reversible!'
    );

    console.log(response);
    if (response) {
      fetch(
        `https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com/users/${user.username}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  birth = new Date(user.birth);
  birthString = birth.toLocaleDateString('sv-SE', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <Form onSubmit={updateUser}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
            type="date"
            value={birthString}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="update-user--button" variant="success" type="submit">
          Submit
        </Button>
        <Button
          className="delete-user--button"
          variant="danger"
          onClick={deregister}
        >
          Delete User
        </Button>
      </Form>
    </>
  );
};
