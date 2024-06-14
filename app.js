import express from "express";
import fetch from "node-fetch";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();
const port = 5000;
const apiKey = process.env.TMDB_API_KEY;

app.use(cors());

app.get('/search', async (req, res) => {
  const { movie } = req.query; // Extract movie name from query parameter
  const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=true&language=en-US&page=1&api_key=${apiKey}`;

  try {
    const response = await fetch(url);  // Making an HTTP GET request to the TMDb API
    const data = await response.json(); // Parsing the response as JSON

    // Check if there are no results or results array is empty
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movieId = data.results[0].id;
    const urlId = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1&api_key=${apiKey}`;
    const responseSimilar = await fetch(urlId);
    const similarMovies = await responseSimilar.json();

    const result = {
      movie: data.results[0],
      similarMovies: similarMovies.results,
    };

    res.json(result);

  } catch (error) {
    console.error('error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
