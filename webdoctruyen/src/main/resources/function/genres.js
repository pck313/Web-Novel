document.addEventListener('DOMContentLoaded', (event) => {
    fetch('data/genres.json')
        .then(response => response.json())
        .then(data => {
            const genres = data.genres;
            const genresListDiv = document.querySelector('.genres-list');

            genres.forEach(genre => {
                const genreDiv = document.createElement('div');
                genreDiv.classList.add('genre-item');
                genreDiv.innerHTML = `<input type="checkbox" id="${genre}" name="genre" value="${genre}">
                                      <label for="${genre}">${genre}</label>`;
                genresListDiv.appendChild(genreDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function searchByGenres() {
    const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(checkbox => checkbox.value);
    if (selectedGenres.length > 0) {
        const queryString = selectedGenres.map(genre => `genre=${encodeURIComponent(genre)}`).join('&');
        window.location.href = `search_results.html?${queryString}`;
    } else {
        alert('Vui lòng chọn ít nhất một thể loại!');
    }
}
