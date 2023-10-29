import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch('https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: '.data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('No Such User');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  return (
    <Row className="justify-content-center">
      <Col md={4} className="login-signup--page">
        <div className="logo login-page">myFLIX</div>
        <form className="login--form" onSubmit={handleSubmit}>
          <label>
            Username:
            <br />
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <Button type="submit">Submit</Button>
          <Button
            className="signup--button"
            variant="outline-primary"
            onClick={() => {
              let loginView = document.querySelector('.login--view');
              loginView.classList.add('hide--signup-or-login');
              let signupView = document.querySelector('.signup--view');
              signupView.classList.remove('hide--signup-or-login');
            }}
          >
            Signup
          </Button>
        </form>
      </Col>
    </Row>
  );
};
