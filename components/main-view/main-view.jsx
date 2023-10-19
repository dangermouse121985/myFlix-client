import React, { useEffect } from 'react';
import { useState } from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://dcrichlow-mymoviesflix-bb84bd41ee5a.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            image: movie.imagePath,
            url: movie.url,
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    console.log(selectedMovie.id);
    return (
      <MovieView
        key={selectedMovie.id}
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>No results Found!</div>;
  }

  return (
    <div className="main">
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
