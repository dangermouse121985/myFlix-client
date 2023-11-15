import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';
import { useSelector } from 'react-redux';

export const FavoritesView = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const movies = useSelector((state) => state.movies.list);

  const favoriteMovies = movies.filter((m) => {
    return user.favorites.includes(m.id);
  });

  return (
    <Row>
      <Col>
        <h2>My Favorites</h2>
        <Row className="justify-content-center">
          {favoriteMovies.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : (
            favoriteMovies.map((movie) => (
              <Col className="mb-5" md={3} key={movie.id}>
                <MovieCard movie={movie} user={user} />
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  );
};
