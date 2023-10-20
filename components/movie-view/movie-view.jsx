import { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  const [selectedMovie, setMovie] = useState([]);
  let url =
    `https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com` + movie.url;
  useEffect(() => {
    fetch(url)
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
  }, []);

  return (
    <div className="one-movie--main">
      <div className="one-movie--view">
        <div>
          <img
            className="movie-view--image"
            src={movie.image}
            alt={movie.title}
          />
        </div>
        <div className="movie-view--text">
          <div className="movie-view--text-heading">
            <h1>{selectedMovie.title}</h1>
          </div>
          <div>
            <span>{selectedMovie.description}</span>
          </div>
          <div>
            <h2>Genre</h2>
            <span>{selectedMovie.genre}</span>
          </div>
          <div>
            <h2>Director</h2>
            <span>{selectedMovie.director}</span>
          </div>
          <div>
            <h2>Actors</h2>
            <span>
              {selectedMovie.actors
                ? selectedMovie.actors.map((name) => <div>{name}</div>)
                : null}
            </span>
          </div>
          <button className="back-button" onClick={onBackClick}>
            X
          </button>
        </div>
      </div>
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
  onBackClick: PropTypes.func.isRequired,
};
