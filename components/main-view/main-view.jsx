import React from 'react';
import { useState } from 'react';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'The Dark Knight',
      description:
        'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      genreName: 'Action',
      directorName: 'Christopher Nolan',
      actors: ['Christian Bale', 'Heath Ledger', 'Aaron Echart'],
      image:
        'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTdkJNhyQgUH-VQBVaeczyvAMEi78DeTFRMexMdUxpapinKBf1h',
      featured: true,
    },
    {
      id: 2,
      title: 'The Godfather',
      description:
        'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.',
      genreName: 'Drama',
      directorName: 'Francis Ford Coppola',
      actors: ['Marlon Brando', 'Al Pacino', 'James Caan'],
      image:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6EAZYpFPv-j-msWE7uFUueby2qiH_lz67ryBOJ41kg4nKHJ6y',
      featured: true,
    },
    {
      id: 3,
      title: 'Forest Gump',
      description:
        "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
      genreName: 'Drama',
      directorName: 'Robert Zemeckis',
      actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
      image:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC1pmwVs3b9KW0IT4ivccOXPYRQbAH2VpOWLwSumVqwAnJ1u8G',
      featured: false,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>No results Found!</div>;
  }

  return (
    <div>
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

export default MainView;
