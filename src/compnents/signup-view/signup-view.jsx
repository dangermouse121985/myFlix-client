import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const SignupView = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      birth: birthday,
      username: username,
      password: password,
    };

    const apiURL = process.env.MOVIE_FLIX_AWS_API_URL;
    //const apiURL = process.env.MOVIE_FLIX_HEROKU_API_URL;

    fetch(`${apiURL}/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Signup Successful');
        window.location.href = '/login';
      } else {
        alert('Signup Failed');
      }
    });
  };
  return (
    <Row className="justify-content-center">
      <Col md={4} className="login-signup--page">
        <div className="logo signup-page">myFLIX</div>
        <form className="signup--form" onSubmit={handleSubmit}>
          <label>
            First Name:
            <br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              minLength={2}
            />
          </label>
          <label>
            Last Name:
            <br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              minLength={2}
            />
          </label>
          <label>
            Email:
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Birthday:
            <br />
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </label>
          <label>
            Username:
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={5}
            />
          </label>
          <label>
            Password:
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={5}
              required
            />
          </label>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="outline-primary"
            className="signup--button"
            onClick={() => {
              window.location.href = '/login';
            }}
          >
            Return to Login
          </Button>
        </form>
      </Col>
    </Row>
  );
};
