import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../src/redux/reducers/movies';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { UserView } from '../user-view/user-view';
import { FavoritesView } from '../favorites-view/favorites-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const movies = useSelector((state) => state.movies);
  //const [movies, setMovies] = useState([]);

  const user = useSelector((state) => state.user);
  //const [user, setUser] = useState(storedUser ? storedUser : null);

  const token = useSelector((state) => state.token);
  //const [token, setToken] = useState(storedToken ? storedToken : null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }
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
        dispatch(setMovies(moviesFromApi));
        //setMovies(moviesFromApi);
      });
  }, [token]);

  let simMovies = (selectedMovie) => {
    {
      return movies
        .filter((movie) => {
          return (
            movie.genre.includes(selectedMovie.genre) && movie !== selectedMovie
          );
        })
        .map((filteredName) => filteredName);
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar></NavigationBar>
      <Row className="justify-content-md-center main">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <div className="login--view">
                    <LoginView />
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
                  <div>
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
                    <MovieView key={movies.id} simMovies={simMovies} />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <UserView user={user} />
                  </>
                )}
              </>
            }
          ></Route>
          <Route
            path="/user/favorites"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : user.favorites.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <FavoritesView key={movies.id}></FavoritesView>
                  </>
                )}
              </>
            }
          ></Route>
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
