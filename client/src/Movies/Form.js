import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function Form(props) {
  const [movie, setMovie] = useState();
  const [updating, setUpdating] = useState(true);
  let titleRef = useRef();
  let directorRef = useRef();
  let metascoreRef = useRef();

  useEffect(() => {
    if (updating) {
      fetchMovie(props.match.params.id);
    } setUpdating(false)
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

  const addMovie = e => {
      e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies/", {
        title: titleRef.current.value,
        director: directorRef.current.value,
        metascore: metascoreRef.current.value,
        stars: ["bla", "bla", "bla"]
      })
      .then(res => props.history.push("/"))
      .catch(err => alert(err));
  };

  if (updating && !movie) {
    return <div>Loading movie information...</div>;
  }
  return (
    <div>{!updating ? <h1>Add Movie</h1> : <h1>Update {movie.title}</h1> }
     
      <form>
        <input ref={titleRef} placeholder="Title" />
        <input ref={directorRef} placeholder="Director" />
        <input ref={metascoreRef} placeholder="Metascore" />
        <button onClick={ updating ? updateMovie : addMovie}>Submit</button>
      </form>
    </div>
  );
}
