document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-list');
    const movieForm = document.getElementById('movie-form');

    // Fetch movies from the backend
    fetch('http://127.0.0.1:8000/movies')
        .then(response => response.json())
        .then(data => {
            data.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.textContent = `${movie.title} (${movie.year}) - Rating: ${movie.rating}`;
                movieList.appendChild(movieDiv);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));

    // Handle form submission
    movieForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newMovie = {
            title: document.getElementById('title').value,
            overview: document.getElementById('overview').value,
            year: parseInt(document.getElementById('year').value, 10), // Convertir a número entero
            rating: parseFloat(document.getElementById('rating').value), // Convertir a número flotante
            category: document.getElementById('category').value
        };
        console.log(newMovie);
        fetch('http://127.0.0.1:8000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(newMovie),
        })
        .then(response => {
            if (response.ok) {
                alert('Movie added successfully!');
                // Refresh the movie list or redirect to another page
            } else {
                alert('Error adding movie.');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
