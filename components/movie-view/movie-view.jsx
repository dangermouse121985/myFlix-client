import React, { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';
export const MovieView = ({ movies, token, simMovies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);
  console.log(movie);
  /*  let url =
    `https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com` + movie.url;
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const actorNames = data.actors.map((actors) => {
          return actors.name;
        });
        const dataFromMovie = {
          id: data._id,
          title: data.title,
          description: data.description,
          director: data.director.name,
          actors: actorNames,
          genre: data.genre.name,
        };

        setMovie(dataFromMovie);
      });
  }, []); */
  console.log(movie.actors);
  return (
    <div className="one-movie--main">
      <Row className="justify-content-center">
        <Col md={8}>
          <Row className="justify-content-center one-movie--view " flex="1">
            <Col className="movie-view--image_container" md={6}>
              <div>
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
                    return <div key={actor.id}>{actor.name}</div>;
                  })}
                </span>
              </div>
              <br />
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
            {simMovies(movie).map((movie) => (
              <Col className="mb-5" md={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string,
  }),
};
