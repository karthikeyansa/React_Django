import React, { useState, useEffect } from "react";
import "./App.css";
import Movielist from "./components/Movielist";
import Moviedetails from "./components/Moviedetails";
import Movieform from "./components/Movieform";
import { useCookies } from "react-cookie";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedmovie, setSelectedmovie] = useState(null);
  const [editedmovie, setEditedmovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(["mr-token"]);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data]);

  useEffect(() => {
    if (!token["mr-token"]) window.location.href = "/";
  }, [token]);

  const loadMovie = (movie) => {
    setSelectedmovie(movie);
    setEditedmovie(null);
  };
  const editMovie = (movie) => {
    setEditedmovie(movie);
    setSelectedmovie(null);
  };
  const updatedMovie = (movie) => {
    const newMovies = movies.map((mov) => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    });
    setMovies(newMovies);
  };
  const newMovie = () => {
    setEditedmovie({ title: "", desc: "" });
    setSelectedmovie(null);
  };
  const Moviecreated = (movie) => {
    const newAddedMovies = [...movies, movie];
    setMovies(newAddedMovies);
  };
  const removedMovie = (movie) => {
    const newMoviesdelete = movies.filter((mov) => mov.id !== movie.id);
    setMovies(newMoviesdelete);
  };
  const logout = () => {
    deleteToken(["mr-token"]);
  };

  if (loading) return <h1>loading ...</h1>;
  if (error) return <h1>Error loading</h1>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} />
      </header>
      <div className="layout">
        <div>
          <Movielist
            movieClicked={loadMovie}
            movies={movies}
            editMovie={editMovie}
            removedMovie={removedMovie}
          />
          <button onClick={newMovie}>New Movie</button>
        </div>
        <Moviedetails movie={selectedmovie} updatedMovie={loadMovie} />
        {editedmovie ? (
          <Movieform
            movie={editedmovie}
            updatedMovie={updatedMovie}
            Moviecreated={Moviecreated}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
