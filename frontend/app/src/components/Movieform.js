import React, { useState,useEffect } from "react";
import { API } from '../apiService';
import { useCookies }from 'react-cookie';

function Movieform(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [token] = useCookies(['mr-token']);

  useEffect(()=>{
    setTitle(props.movie.title)
    setDescription(props.movie.desc)
  },[props.movie])


  const updateMovie = (movie) => (event) =>{
    API.updateMovie(movie, { title: title, desc: description },token['mr-token'])
    .then(resp => props.updatedMovie(resp))
    .catch((error) => console.log(error));
  };
  const createClicked = () =>{
    API.createMovie({ title: title, desc: description },token['mr-token'])
    .then(resp => props.Moviecreated(resp))
    .catch((error) => console.log(error));
  };

  const isdisabled = title.length === 0 || description.length === 0;

  return (
    <React.Fragment>
      {props.movie ? (
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            value={title}
            placeholder={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            type="text"
            value={description}
            placeholder={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <br />
          {
          props.movie.id ? 
          <button onClick={updateMovie(props.movie)} disabled={isdisabled}>Update</button> :
          <button onClick={createClicked} disabled={isdisabled}>Create</button>
          }
          </div>
      ) : null}
    </React.Fragment>
  );
}

export default Movieform;
