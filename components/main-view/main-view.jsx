import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { HeaderView } from '../header-view/header-view';

<Button
  variant="outline-primary"
  onClick={() => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }}
>
  Logout
</Button>;

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

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <div className="login--view">
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <div className="signup--view hide--signup-or-login">
                    <SignupView />
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <MovieView key={movies.id} movies={movies} />
                    {/* <hr />
                    <h2 className="similar-movies">Similar Movies</h2>

                    {similarMovies.map((movie) => (
                      <Col md={3} key={movie.id}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))} */}
                  </>
                )}
              </>
            }
          />
          {/* <Row className="justify-content-md-center home-page--main"> */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => {
                      return (
                        <Col className="mb-5" key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      );
                    })}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
