import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [Movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8800/Movies");
        setMovies(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/Movies/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Home_Page</h1>
      <div className="Movies">
        {Movies.map((Movie) => (
          <div className="Movie" key={Movie.id}>
            {Movie.ThumbnailLink && <img src={Movie.ThumbnailLink} alt="" />}
            <h2>{Movie.MovieName}</h2>
            <p>{Movie.Description}</p>
            <span>{Movie.Year}</span>
            <button className="delete" onClick={() => handleDelete(Movie.id)}>
              Delete
            </button>
            <button className="update">
              <Link
                to={`/update/${Movie.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add a Movie
        </Link>
      </button>
    </div>
  );
};

export default Home;
