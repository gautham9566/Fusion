import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gautham9566",
  database: "fusion_db",
});

app.get("/", (req, res) => {
  res.json("hello this is Backend");
});

app.get("/Movies", (req, res) => {
  const q = "SELECT * FROM Movies";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.post("/Movies", (req, res) => {
  const q =
    "INSERT INTO Movies (MovieName, Language, Year, Description, ThumbnailLink, VideoLink) VALUES (?, ?, ?, ?, ?, ?)";

  const values = [
    req.body.MovieName,
    req.body.Language,
    req.body.Year,
    req.body.Description,
    req.body.ThumbnailLink,
    req.body.VideoLink,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.delete("/Movies/:id", (req, res) => {
  const movieId = req.params.id;
  const q = "DELETE FROM Movies WHERE id = ?";

  db.query(q, [movieId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.put("/Movies/:id", (req, res) => {
  const movieId = req.params.id;
  const q =
    "UPDATE Movies SET MovieName = ?, Language = ?, Year = ?, Description = ?, ThumbnailLink = ?, VideoLink = ? WHERE id = ?";
  const values = [
    req.body.MovieName,
    req.body.Language,
    req.body.Year,
    req.body.Description,
    req.body.ThumbnailLink,
    req.body.VideoLink,
    movieId,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
