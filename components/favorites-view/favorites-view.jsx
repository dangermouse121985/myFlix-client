import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';
import { useSelector, useDispatch } from 'react-redux';

export const FavoritesView = () => {
  const userForFav = JSON.parse(localStorage.getItem('user'));
  const user = useSelector((state) => state.user);
  const movies = useSelector((state) => state.movies);
  console.log(user);

  const favoriteMovies = movies.filter((m) => {
    return user.favorites.includes(m.id);
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

/* FavoritesView.propTypes = {
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
}; */
