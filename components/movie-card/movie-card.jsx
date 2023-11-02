import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, ToggleButton, Card } from 'react-bootstrap';
import { StarRating } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FavoritesView } from '../favorites-view/favorites-view';

export const MovieCard = ({ movies, movie, user }) => {
  const token = localStorage.getItem('token');
  const [checked, setChecked] = useState(
    user.favorites.indexOf(movie.id) > -1 ? true : false
  );

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

  function refreshPage() {}

  return (
    <Card
      className="movie-card h-100"
      id={movie.id}
      onClick={window.scrollTo({ top: 0, behavior: 'instant' })}
    >
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
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
      </Link>
      <ToggleButton
        id={movie.title}
        className="mb-2 movie-favorites-button"
        type="checkbox"
        variant="secondary"
        checked={checked}
        value="1"
        onChange={(e) => setChecked(e.currentTarget.checked)}
        onClick={() => {
          if (!user.favorites) {
          } else if (user.favorites.indexOf(movie.id) > -1) {
            delFav();
            let card = document.getElementById(movie.id);
            if (window.location.pathname === '/user/favorites') {
              card.style.display = 'none';
            }
          } else {
            addFav();
          }
        }}
      >
        Favorite
      </ToggleButton>
    </Card>
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
