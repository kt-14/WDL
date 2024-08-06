document.addEventListener('DOMContentLoaded', () => {
    const movieCardsContainer = document.getElementById('movie-cards');

    fetch('https://dummyapi.online/api/movies')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Log the JSON data to inspect the structure

            // Check if data is an array
            if (!Array.isArray(data)) {
                throw new Error('Unexpected response structure');
            }

            const movies = data;

            movies.forEach(movie => {
                const card = document.createElement('div');
                card.classList.add('card');

                if (movie.image) {
                    const imagePath = movie.image;  // Path is relative to the root of the server
                    console.log(`Loading image for ${movie.movie}: ${imagePath}`);
                    const img = document.createElement('img');
                    img.src = imagePath;
                    img.alt = movie.movie;
                    img.onerror = () => {
                        console.error(`Failed to load image for ${movie.movie}: ${imagePath}`);
                        img.src = 'path/to/placeholder-image.jpg'; // Fallback image
                    };
                    card.appendChild(img);
                } else {
                    console.warn(`No image found for ${movie.movie}`);
                }

                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');

                const cardTitle = document.createElement('h2');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = movie.movie;

                const cardRating = document.createElement('p');
                cardRating.classList.add('card-rating');
                cardRating.textContent = `Rating: ${movie.rating}`;

                const imdbLink = document.createElement('a');
                imdbLink.href = movie.imdb_url;
                imdbLink.textContent = 'View on IMDb';
                imdbLink.target = '_blank';
                imdbLink.classList.add('imdb-link');

                cardContent.appendChild(cardTitle);
                cardContent.appendChild(cardRating);
                cardContent.appendChild(imdbLink);

                card.appendChild(cardContent);

                movieCardsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to load movies. Please try again later.';
            movieCardsContainer.appendChild(errorMessage);
        });
});
