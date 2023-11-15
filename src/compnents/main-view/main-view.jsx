import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../redux/reducers/movies';
import { setGenres } from '../../redux/reducers/genres';
import { setDirectors } from '../../redux/reducers/directors';
import { setActors } from '../../redux/reducers/actors';

import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { UserView } from '../user-view/user-view';
import { FavoritesView } from '../favorites-view/favorites-view';
import { MoviesList } from '../movies-list/movies-list';
//import { setToken, setUserProfile } from '../../redux/reducers/user';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const movies = useSelector((state) => state.movies.list);

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

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
        const genresFromApi = data.map((movie) => {
          return { name: movie.genre.name };
        });

        const directorsFromApi = data.map((movie) => {
          return { name: movie.director.name };
        });

        const actorsFromApi = data.map((movie) => {
          return { actors: movie.actors };
        });
        dispatch(setMovies(moviesFromApi));

        const genresArr = genresFromApi.map((genre) => genre.name);
        const genresUnique = Array.from(new Set(genresArr));
        dispatch(setGenres(genresUnique));

        const directorsArr = directorsFromApi.map((director) => director.name);
        const directorsUnique = Array.from(new Set(directorsArr));
        dispatch(setDirectors(directorsUnique));

        //2 Dimensional Array
        const actorsArr = actorsFromApi.map(({ actors }) => {
          return actors.map(({ name }) => {
            return name;
          });
        });

        //Convert 2 dimenstional array to 1 dimensional array
        let actorsArrSimp = [];

        for (let i = 0; i < actorsArr.length; i++) {
          for (let j = 0; j < actorsArr[i].length; j++) {
            actorsArrSimp.push(actorsArr[i][j]);
          }
        }
        const actorsUnique = Array.from(new Set(actorsArrSimp));
        dispatch(setActors(actorsUnique));
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
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      ></NavigationBar>
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
                    <MovieView
                      key={movies.id}
                      movies={movies}
                      user={user}
                      simMovies={simMovies}
                    />
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
                    <FavoritesView
                      user={user}
                      key={movies.id}
                      movies={movies}
                    ></FavoritesView>
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
                    <MoviesList />
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
