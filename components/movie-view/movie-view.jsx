import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';
import { useSelector, useDispatch } from 'react-redux';

export const MovieView = ({ simMovies }) => {
  const { movieId } = useParams();
  const movies = useSelector((state) => state.movies);
  const movie = movies.find((m) => m.id === movieId);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [checked, setChecked] = useState(
    user.favorites.indexOf(movie.id) > -1 ? true : false
  );

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
  const addFav = (event) => {
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
                id={movie.title}
                className="mb-2 movie-view--favorites-button"
                type="checkbox"
                variant="outline-primary"
                checked={checked}
                value="1"
                onChange={(e) => setChecked(e.currentTarget.checked)}
                onClick={(event) => {
                  if (!user.favorites) {
                    return;
                  } else if (user.favorites.indexOf(movie.id) > -1) {
                    delFav(event);
                    let card = document.getElementById(movie.id);
                    if (window.location.pathname === '/user/favorites') {
                      card.style.display = 'none';
                    }
                  } else {
                    addFav(event);
                  }
                }}
              >
                Favorite
              </ToggleButton>
              <Link to={'/'}>
                <Button variant="outline-primary">Back to Menu</Button>
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
                <MovieCard movie={m} user={user} key={m.id} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

/* MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string,
  }),
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    favorites: PropTypes.array.isRequired,
  }).isRequired,
  simMovies: PropTypes.func.isRequired,
}; */
