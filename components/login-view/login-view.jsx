import { useState } from 'react';

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
    <form className="login--form" onSubmit={handleSubmit}>
      <label>
        Username:
        <br />
        <input
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
      <button type="submit">Submit</button>
      <button
        className="signup--button"
        onClick={() => {
          let loginView = document.querySelector('.login--view');
          loginView.classList.add('hide--signup-or-login');
          let signupView = document.querySelector('.signup--view');
          signupView.classList.remove('hide--signup-or-login');
        }}
      >
        Signup
      </button>
    </form>
  );
};
