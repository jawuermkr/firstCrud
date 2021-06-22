import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([])

  const [newReview, setNewReview] = useState(""); 

  // This make the get 
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data)
    });
  }, []);

  // From here I send to the backend
  const submitReview = () => {

    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review,
    });
      
      setMovieList([
        ...movieReviewList,
        {movieName: movieName, movieReview: review},
      ]);
  };

  // Here we delete

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  // Here for update

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("")
  };

  return (

    <div className="App">
    <div class="container">
    <div class="row">
    <h1>CRUD</h1>
    <p>Primer CRUD usando REACT, NODE y MYSQL.</p>
      <div className="form">
        <div class="input-field col s3">
          <label>Usuario:</label>
          <input type="text" name="movieName" onChange={(e) => {setMovieName(e.target.value)} }/>
        </div>
        <div class="input-field col s9">
          <label>Tarea:</label>
          <input type="text" name="review" onChange={(e) => {setReview(e.target.value)} }/>
        </div>
        
        <button class="btn waves-effect waves-light" onClick={submitReview}>Submit</button>

        {movieReviewList.map((val)=>{
          return ( 
          <div className="card">
            <h1>{val.movieName}</h1>
            <p>{val.movieReview}</p>

            <div class="input-field col s12">
              <input type="text" id="updateInput" onChange={(e)=>{setNewReview(e.target.value)}}/>
            </div>
            <button class="btn waves-effect waves-light" onClick={() => {deleteReview(val.movieName)}}>Delete</button>
            <button class="btn waves-effect waves-light" onClick={()=>{updateReview(val.movieName)}}>Update</button>
          </div>
          );
        })}
      </div>
    </div>
    </div>
    </div>
  );
}

export default App;