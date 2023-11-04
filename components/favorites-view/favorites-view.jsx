import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';

export const FavoritesView = ({ movies, user }) => {
  const token = localStorage.getItem('token');

  const userForFav = JSON.parse(localStorage.getItem('user'));

  const favoriteMovies = movies.filter((m) => {
    return userForFav.favorites.includes(m.id);
  });

  return (
    <Row>
      <Col>
        <h2>My Favorites</h2>
        <Row className="justify-content-center">
          {favoriteMovies.map((movie) => (
            <Col className="mb-5" md={3} key={movie.id}>
              <MovieCard movie={movie} user={user} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
