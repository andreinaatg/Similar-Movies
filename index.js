// Add event listener to the search button
document.getElementById('search-btn').addEventListener('click', similarMovies);

// Function to fetch and display similar movies
async function similarMovies() {
    try {
        // Get the input value
        const input = document.getElementById("input").value;

        // Fetch data from the server
        const response = await fetch(`http://localhost:5000/search?movie=${input}`);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse response data
        const data = await response.json();

        // Get reference to the similar movies container and the list
        const similarMoviesDiv = document.getElementById("similarMovies");
        const list = document.getElementById('list');

        // Clear previous search results
        list.innerHTML = "";

        // If movie not found, display a message and return
        if (!data.movie) {
            similarMoviesDiv.innerHTML = `<p>Movie not found</p>`;
            return;
        }

        // Clear previous main movie
        const mainMovieContainer = document.querySelector('.main-movie-container');
        mainMovieContainer.innerHTML = "";

        // Create elements for the main movie
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("main-movie");

        const title = document.createElement("h2");
        title.textContent = data.movie.title;

        const poster = document.createElement("img");
        poster.src = `https://image.tmdb.org/t/p/w500/${data.movie.poster_path}`;
        poster.alt = data.movie.title;

        // Append main movie elements to the container
        movieDiv.appendChild(title);
        movieDiv.appendChild(poster);
        mainMovieContainer.appendChild(movieDiv);

        // If no similar movies found, display a message and return
        if (data.similarMovies.length === 0) {
            list.innerHTML = `<p>No similar movies found</p>`;
            return;
        }

        // Iterate through similar movies and create list items
        data.similarMovies.forEach(similarMovie => {
            const similarListItem = document.createElement("li");
            similarListItem.classList.add("item");

            const similarMovieDiv = document.createElement("div");
            similarMovieDiv.classList.add("movie");

            const similarTitle = document.createElement("h2");
            similarTitle.textContent = similarMovie.title;

            const similarPoster = document.createElement("img");
            similarPoster.src = `https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`;
            similarPoster.alt = similarMovie.title;

            // Append similar movie elements to the list item
            similarMovieDiv.appendChild(similarPoster);
            similarMovieDiv.appendChild(similarTitle);
            similarListItem.appendChild(similarMovieDiv);
            list.appendChild(similarListItem); // Append to the list
        });

    //show heading
    const heading = document.getElementById('heading');
    heading.style.display = 'block';

    } catch (error) {
        console.error('Error:', error);
    }
}
 