const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} width="500px" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genreName}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.directorName}</span>
      </div>
      <div>
        <span>Actor: </span>
        <span>
          {movie.actors.map((actor) => {
            <div>{actor}</div>;
          })}
        </span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

export default MovieView;
