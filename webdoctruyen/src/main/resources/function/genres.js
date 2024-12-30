document.addEventListener('DOMContentLoaded', (event) => {
    fetch('data/genres.json')
        .then(response => response.json())
        .then(data => {
            const genres = data.genres;
            const genresListDiv = document.querySelector('.genres-list');

            genres.forEach(genre => {
                const genreDiv = document.createElement('div');
                genreDiv.classList.add('genre-item');
                // Tạo liên kết cho thể loại, truyền thể loại vào URL
                genreDiv.innerHTML = `<a href="books.html?genre=${encodeURIComponent(genre)}">${genre}</a>`;
                genresListDiv.appendChild(genreDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
