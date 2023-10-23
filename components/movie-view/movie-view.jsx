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
        <div className="movie-view--image_container">
          <img
            className="movie-view--image"
            src={movie.image}
            alt={movie.title}
          />
        </div>
        <div className="movie-view-text--heading">
          <h1>{selectedMovie.title}</h1>
          <hr />
        </div>
        <div className="movie-view-text--description">
          <span>{selectedMovie.description}</span>
        </div>
        <div className="movie-view-text--genre">
          <h2 className="movie-view-text--genre_heading">Genre</h2>
          <span>{selectedMovie.genre}</span>
        </div>
        <div className="movie-view-text--director">
          <h2>Director</h2>
          <span>{selectedMovie.director}</span>
        </div>
        <div className="movie-view-text--actors">
          <h2>Actors</h2>
          <span>
            {selectedMovie.actors
              ? selectedMovie.actors.map((name) => <div key={name}>{name}</div>)
              : null}
          </span>
        </div>
        <button className="back-button" onClick={onBackClick}>
          X
        </button>
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
