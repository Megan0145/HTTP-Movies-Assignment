import React, { useRef } from "react";
import axios from 'axios';

export default function AddMovieForm(props) {
  const titleRef = useRef();
  const directorRef = useRef();
  const metascoreRef = useRef();

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

  return (
    <div>
      <h1>Add Movie</h1>
      <form>
        <input ref={titleRef} placeholder="Title" />
        <input ref={directorRef} placeholder="Director" />
        <input ref={metascoreRef} placeholder="Metascore" />
        <button onClick={addMovie}>Submit</button>
      </form>
    </div>
  );
}
