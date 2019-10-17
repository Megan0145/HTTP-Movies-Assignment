import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Form(props) {
  const [movie, setMovie] = useState();
  const [formData, setFormData] = useState({});

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
        ...formData
      })
      .then(res => {
        props.history.push("/");
      })
      .catch(err => alert(err));
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  return (
    <div>
      <h1>Update {movie.title}</h1>

      <form>
        <input
          value={formData.title}
          name="title"
          onChange={handleChange}
          type="text"
        />
        <input
          value={formData.director}
          name="director"
          onChange={handleChange}
          type="text"
        />
        <input
          value={formData.metascore}
          name="metascore"
          onChange={handleChange}
          type="text"
        />
        <button onClick={updateMovie}>Submit</button>
      </form>
    </div>
  );
}
