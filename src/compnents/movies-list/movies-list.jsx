import React from 'react';
import { useSelector } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';
import { MoviesFilter } from '../../compnents/movies-filter/movies-filter';
import { Col, Row } from 'react-bootstrap';

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(filter) ||
      movie.genre.toLowerCase().includes(filter) ||
      movie.director.name.toLowerCase().includes(filter) ||
      movie.actors.some((actor) => actor.name.toLowerCase() === filter)
  );

  return (
    <>
      <Row>
        <MoviesFilter />
      </Row>
      <Row className="movie-list justify-content-md-center">
        {movies.length === 0 ? (
          <Col>The List is Empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
