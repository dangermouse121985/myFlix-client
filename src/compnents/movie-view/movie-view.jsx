import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { MovieCard } from '../../compnents/movie-card/movie-card';
import { useSelector } from 'react-redux';
import { setUserProfile, setToken } from '../../redux/reducers/user';
import { useDispatch } from 'react-redux';

export const MovieView = ({ movies }) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  let [checked, setChecked] = useState(
    user.favorites.indexOf(movie.id) > -1 ? true : false
  );

  console.log(user.favorites.indexOf(movie.id));

  console.log(checked);

  let simMovies = () => {
    {
      return movies
        .filter((m) => {
          return m.genre.includes(movie.genre) && m !== movie;
        })
        .map((filteredName) => filteredName);
    }
  };

  //Delete Movie From User's Favorites List
  const delFav = () => {
    {
      fetch(
        `https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com/users/${user.username}/favorites/${movie.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'DELETE',
        }
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data));
        });
    }
  };

  //Add Movie to User's Favorites List
  const addFav = () => {
    {
      fetch(
        `https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com/users/${user.username}/favorites/${movie.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'PUT',
        }
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data));
        });
    }
  };

  return (
    <div className="one-movie--main">
      <Row className="justify-content-center">
        <Col md={8}>
          <Row className="justify-content-center one-movie--view " flex="1">
            <Col className="movie-view--image_container" md={6}>
              <div className="movie-view--card">
                <img
                  className="movie-view--image"
                  src={movie.image}
                  alt={movie.title}
                />
              </div>
            </Col>
            <Col className="movie-view--text_container" md={6}>
              <div className="movie-view-text--heading">
                <h1>{movie.title}</h1>
                <hr />
              </div>
              <div className="movie-view-text--description">
                <span>{movie.description}</span>
              </div>
              <div className="movie-view-text--genre">
                <h2 className="movie-view-text--genre_heading">Genre</h2>
                <span>{movie.genre}</span>
              </div>
              <div className="movie-view-text--director">
                <h2>Director</h2>
                <span>{movie.director.name}</span>
              </div>
              <div className="movie-view-text--actors">
                <h2>Actors</h2>
                <span>
                  {movie.actors.map((actor) => {
                    return <div key={actor._id}>{actor.name}</div>;
                  })}
                </span>
              </div>
              <br />
              <ToggleButton
                id={movie.id}
                className="mb-2 movie-view--favorites-button"
                type="checkbox"
                variant="outline-primary"
                checked={checked}
                value={checked}
                onChange={() => {
                  setChecked(!checked);
                  if (!user.favorites) {
                    return;
                  } else if (user.favorites.indexOf(movie.id) > -1) {
                    delFav();
                  } else {
                    addFav();
                  }
                }}
              >
                Favorite
              </ToggleButton>
              <Link to={'/'}>
                <Button
                  variant="outline-primary"
                  claaName="movie-view--backToMenu-button"
                >
                  Back to Menu
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
          <h2 className="similar-movies">Similar Movies</h2>
          <Row className="justify-content-center">
            {simMovies(movie).map((m) => (
              <Col className="mb-5" md={3} key={m.id}>
                <MovieCard movie={m} key={m.id} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

MovieView.propTypes = {
  simMovies: PropTypes.func.isRequired,
};
