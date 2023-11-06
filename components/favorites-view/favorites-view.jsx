import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';

export const FavoritesView = ({ movies, user }) => {
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

FavoritesView.propTypes = {
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
  }),
};
