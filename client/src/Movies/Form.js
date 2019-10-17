import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Form(props) {
  const [movie, setMovie] = useState();
  const [formData, setFormData] = useState();

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, []);

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
        setFormData(res.data);
      })
      .catch(err => console.log(err.response));
  };

  const updateMovie = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, {
        id: movie.id,
        ...movie
      })
      .then(res => {
        props.history.push("/");
      })
      .catch(err => alert(err));
  };

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  return (
    <div>
      <h1>Update {movie.title}</h1>

      <form>
        Name:
        <input
          value={movie.title}
          name="title"
          onChange={handleChange}
          type="text"
        />
        Director:
        <input
          value={movie.director}
          name="director"
          onChange={handleChange}
          type="text"
        />
        Metascore:
        <input
          value={movie.metascore}
          name="metascore"
          onChange={handleChange}
          type="text"
        />
        Stars: 
        <input value={movie.stars[0]} onChange={handleChange} name={`stars`} type="text" />
        { console.log(stars)}
        <button onClick={updateMovie}>Submit</button>
      </form>
    </div>
  );
}
