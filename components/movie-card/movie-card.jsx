import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, ToggleButton, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export const MovieCard = ({ movie }) => {
  //const token = localStorage.getItem('token');
  const token = useSelector((state) => state.token);
  //let user = JSON.parse(localStorage.getItem('user'));
  const user = useSelector((state) => state.user);
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
  const addFav = (e) => {
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
        className="mb-2 movie-card--favorites-button"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onChange={(e) => setChecked(e.currentTarget.checked)}
        onClick={(event) => {
          user = JSON.parse(localStorage.getItem('user'));
          if (!user.favorites) {
            return;
          } else if (user.favorites.indexOf(movie.id) > -1) {
            delFav();
            let card = document.getElementById(movie.id);
            if (window.location.pathname === '/user/favorites') {
              card.parentNode.parentNode.removeChild(card.parentNode);
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
