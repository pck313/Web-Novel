document.addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const selectedGenres = urlParams.getAll('genre');

    fetch('path/to/books.json')
        .then(response => response.json())
        .then(data => {
            const books = data.books;
            const filteredBooks = books.filter(book => {
                return selectedGenres.some(genre => book.genre.includes(genre));
            });

            const searchResultsDiv = document.querySelector('.search-results');
            if (filteredBooks.length > 0) {
                filteredBooks.forEach(book => {
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book-item');
                    bookDiv.innerHTML = `
                        <img src="${book.cover}" alt="${book.title} cover">
                        <h3>${book.title}</h3>
                        <p>${book.author}</p>
                    `;
                    searchResultsDiv.appendChild(bookDiv);
                });
            } else {
                searchResultsDiv.innerHTML = '<p>Không tìm thấy sách nào phù hợp với thể loại đã chọn.</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
