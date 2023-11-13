// Update component

import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [movie, setMovie] = useState({
    MovieName: "",
    Description: "",
    Year: "", 
    Language: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const movieId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/Movies/${movieId}`, movie);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Movie</h1>
      <input type="text" placeholder="Movie name" name="MovieName" onChange={handleChange} />
      <textarea rows={5} type="text" placeholder="Movie description" name="Description" onChange={handleChange}/>
      <input type="number" placeholder="Year" name="Year" onChange={handleChange} />
      <input type="text" placeholder="Language" name="Language" onChange={handleChange} />
      <input type="text" placeholder="Image_Link" name="ThumbnailLink" onChange={handleChange} />
      <input type="text" placeholder="Video_Link" name="VideoLink" onChange={handleChange}/>
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Movies</Link>
    </div>
  );
};

export default Update;
