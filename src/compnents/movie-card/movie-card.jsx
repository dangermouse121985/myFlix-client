import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, ToggleButton, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { setUserProfile } from '../../redux/reducers/user';

export const MovieCard = ({ movie }) => {
  const token = localStorage.getItem('token');
  //const token = useSelector((state) => state.token);
  let user = JSON.parse(localStorage.getItem('user'));
  //let user = useSelector((state) => state.user.userProfile);
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
        className="movie-card--favorites-button mb-2"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          user = JSON.parse(localStorage.getItem('user'));
          if (!user.favorites) {
            return;
          } else if (user.favorites.indexOf(movie.id) > -1) {
            delFav();
            let card = document.getElementById(movie.id);
            let parent = card.parentNode;
            if (window.location.pathname === '/user/favorites') {
              parent.parentNode.removeChild(parent);
            }
          } else {
            addFav();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
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
