import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { StarRating } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card className="movie-card h-100">
        <Card.Img variant="top" src={movie.image} alt={movie.title} />
        <Card.Body>
          <Card.Title className="movie-title">
            <span className="titleText">{movie.title}</span>
          </Card.Title>
          <Card.Text>{movie.description.slice(0, 50)}...</Card.Text>
        </Card.Body>

        <Button className="movie-card--button" variant="primary">
          View
        </Button>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
