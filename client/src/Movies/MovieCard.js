import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const MovieCard = props => {
  const { id, title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <NavLink to={`/update-movie/${id}`}><button>Update</button></NavLink>
      {/* <button onClick={deleteMovie}>Delete Movie</button> */}
    </div>
  );
};

export default MovieCard;
