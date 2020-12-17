import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { API } from "../apiService";
import { useCookies } from 'react-cookie';

function Moviedetails(props) {
  const [hightlighted, setHightlighted] = useState(-1);
  const [token] = useCookies(['mr-token']);

  const highlightrate = (rate) => (event) => {
    setHightlighted(rate);
  };

  const rateClicked = (rate) => (event) => {
    API.rateClicked(props.movie, rate,token['mr-token'])
      .then(() => getDetails())
      .catch((error) => console.log(error));
  };

  const getDetails = () => {
    API.getDetails(props.movie,token['mr-token'])
      .then((resp) => props.updatedMovie(resp))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {props.movie ? (
        <React.Fragment>
          <h1>{props.movie.title}</h1>
          <p>{props.movie.desc}</p>
          <FontAwesomeIcon
            icon={faStar}
            className={props.movie.avg_rating > 0 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={props.movie.avg_rating > 1 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={props.movie.avg_rating > 2 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={props.movie.avg_rating > 3 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={props.movie.avg_rating > 4 ? "orange" : " "}
          />
          ({props.movie.no_of_rating})
        </React.Fragment>
      ) : null}
      {props.movie ? (
        <div className="rate-container">
          {[...Array(5)].map((e, i) => {
            return (
              <FontAwesomeIcon
                icon={faStar}
                key={i}
                className={hightlighted > i - 1 ? "purple" : " "}
                onMouseEnter={highlightrate(i)}
                onMouseLeave={highlightrate(-1)}
                onClick={rateClicked(i)}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Moviedetails;
