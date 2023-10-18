const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      className="movie-card"
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <img src={movie.image} alt={movie.title} width="100px" />
      <div>{movie.title}</div>
    </div>
  );
};

export default MovieCard;
