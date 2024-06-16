//Loading modules
import express from "express";
import fetch from "node-fetch";
import dotenv from 'dotenv';
import cors from "cors";

// Loading variables from .env file
dotenv.config();

// Initializing Express app
const app = express();
const port = 5000;
const apiKey = process.env.TMDB_API_KEY;

app.use(cors());// // Using CORS middleware to enable CORS

// Endpoint for searching movies
app.get('/search', async (req, res) => {
  const { movie } = req.query; // Extract movie name from query parameter
  const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=true&language=en-US&page=1&api_key=${apiKey}`;

  try {
    const response = await fetch(url);  // Making an HTTP GET request to the TMDb API
    const data = await response.json(); // Parsing the response as JSON

    // Checking if there are no results or results array is empty
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movieId = data.results[0].id; //getting movie ID
    const urlId = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1&api_key=${apiKey}`; //search similar movies based on ID
    const responseSimilar = await fetch(urlId); // Making an HTTP GET request to search for similar movies
    const similarMovies = await responseSimilar.json();

    //store movie + similar movie list
    const result = {
      movie: data.results[0],
      similarMovies: similarMovies.results,
    };

    //sending response as json
    res.json(result);

  } catch (error) {
    console.error('error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
