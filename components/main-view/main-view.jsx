import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            description: movie.description,
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

  let similarMovies;
  if (selectedMovie) {
    similarMovies = movies
      .filter((movie) => {
        return (
          movie.genre.includes(selectedMovie.genre) && movie !== selectedMovie
        );
      })
      .map((filteredName) => filteredName);
  }

  return !user ? (
    <Row className="justify-content-md-center">
      <div className="login--view">
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      </div>

      <div className="signup--view hide--signup-or-login">
        <SignupView />
      </div>
    </Row>
  ) : selectedMovie ? (
    <>
      <button
        class="btn btn-outline-success my-2 my-sm-0"
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>

      {/* <HeaderView
            storedToken={storedToken}
            storedUser={storedUser}
            user={user}
          /> */}
      <Row className="justify-content-md-center">
        <MovieView
          key={selectedMovie.id}
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
          token={token}
        />
        <hr />
        <h2 className="similar-movies">Similar Movies</h2>

        {similarMovies.map((movie) => (
          <Col md={3}>
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
                window.scrollTo(0, 0);
              }}
            />
          </Col>
        ))}
      </Row>
    </>
  ) : movies.length === 0 ? (
    <div>No results Found!</div>
  ) : (
    <>
      <button
        class="btn btn-outline-success my-2 my-sm-0"
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
      {/* <HeaderView
          storedToken={storedToken}
          storedUser={storedUser}
          user={user}
        /> */}
      <Row className="justify-content-md-center">
        {movies.map((movie) => {
          return (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                  window.scrollTo(0, 0);
                }}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
