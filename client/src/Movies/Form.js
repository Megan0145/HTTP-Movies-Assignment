import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function Form(props) {
  const [movie, setMovie] = useState();
  let titleRef = useRef();
  let directorRef = useRef();
  let metascoreRef = useRef();

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, []);

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const updateMovie = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, {
        id: movie.id,
        title: titleRef.current.value,
        director: directorRef.current.value,
        metascore: metascoreRef.current.value,
        stars: movie.stars
      })
      .then(res => {
        props.history.push("/");
      })
      .catch(err => alert(err));
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  return (
      <div>
      <h1>Update {movie.title}</h1>
      <form>
        <input ref={titleRef} placeholder='Title' />
        <input ref={directorRef} placeholder='Director'/>
        <input ref={metascoreRef} placeholder='Metascore' />
        <button onClick={updateMovie}>Submit</button>
      </form>
    </div>
  );
}
