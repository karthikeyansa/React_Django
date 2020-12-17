import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { API } from "../apiService";
import { useCookies } from "react-cookie";

function Movielist(props) {
  const [token] = useCookies(["mr-token"]);

  const movieClicked = (movie) => (event) => {
    props.movieClicked(movie);
  };

  const deleteMovie = (movie) => {
    API.deleteMovie(movie,token['mr-token'])
      .then(() => props.removedMovie(movie))
      .catch((error) => console.log(error));
  };

  const editMovie = (movie) => (event) => {
    props.editMovie(movie);
  };

  return (
    <div className="movie-item">
      {props.movies &&
        props.movies.map((movie) => {
          return (
            <React.Fragment>
              <h2 key={movie.id} onClick={movieClicked(movie)}>
                {movie.title}
              </h2>
              <FontAwesomeIcon icon={faEdit} onClick={editMovie(movie)} />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => deleteMovie(movie)}
              />
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default Movielist;
