import React, { useEffect, useState } from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { HeaderView } from '../header-view/header-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    fetch('https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            image: movie.imagePath,
            url: movie.url,
            actors: movie.actors,
            director: movie.director,
            genre: movie.genre.name,
            featured: movie.featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <div className="login--view">
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
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
        </div>

        <div className="signup--view hide--signup-or-login">
          <SignupView />
        </div>
      </>
    );
  }

  if (selectedMovie) {
    let similarMovies = movies
      .filter((movie) => {
        return (
          movie.genre.includes(selectedMovie.genre) && movie !== selectedMovie
        );
      })
      .map((filteredName) => filteredName);

    return (
      <>
        {/* <HeaderView /> */}
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
          }}
        >
          Logout
        </button>
        <MovieView
          key={selectedMovie.id}
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
          token={token}
        />
        <hr />
        <h2 className="similar-movies">Similar Movies</h2>
        <div className="similar-movies">
          {similarMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </div>
      </>
    );
  }

  if (movies.length === 0) {
    return <div>No results Found!</div>;
  }

  return (
    <>
      <button
        className="logout--button"
        onClick={() => {
          setUser(null);
          setToken(null);
        }}
      >
        Logout
      </button>
      <div className="main">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          );
        })}
      </div>
    </>
  );
};
