import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [Movie, setMovie] = useState({
    MovieName: "",
    Description: "",
    Year: "",
    Language: "",
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/Movies", Movie);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Movie</h1>
      <input type="text" placeholder="Movie name" name="MovieName" onChange={handleChange} />
      <textarea rows={5} type="text" placeholder="Movie description" name="Description" onChange={handleChange}/>
      <input type="number" placeholder="Year" name="Year" onChange={handleChange} />
      <input type="text" placeholder="Language" name="Language" onChange={handleChange} />
      <input type="text" placeholder="Image_Link" name="ThumbnailLink" onChange={handleChange} />
      <input type="text" placeholder="Video_Link" name="VideoLink" onChange={handleChange}/>
      <button onClick={handleClick}>Add</button>
      {error && <p style={{ color: "red" }}>Something went wrong! Please try again.</p>}
      <Link to="/">See all Movies</Link>
    </div>
  );
};

export default Add;
