import { useEffect } from 'react';
import { useState } from 'react';

export const MovieView = ({ movie, onBackClick }) => {
  const [selectedMovie, setMovie] = useState([]);
  let url =
    `https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com` + movie.url;
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

        console.log(dataFromMovie);
        setMovie(dataFromMovie);
      });
  }, []);

  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} width="500px" />
      </div>
      <div>
        <span>Title: </span>
        <span>{selectedMovie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{selectedMovie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{selectedMovie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{selectedMovie.director}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>
          {selectedMovie.actors
            ? selectedMovie.actors.map((name) => <div>{name}</div>)
            : null}
        </span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
