document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        fetch('/data/index.json')
            .then(response => response.json())
            .then(data => {
                const contentDiv = document.querySelector('.content');
                const filteredBooks = data.stories.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));

                filteredBooks.forEach(book => {
                    const storyDiv = document.createElement('div');
                    storyDiv.classList.add('book');
                    storyDiv.innerHTML = `
                            <a href="books.html?story=${encodeURIComponent(book.url)}">
                                <img src="${book.cover}" alt="${book.title}">
                                <p>${book.title}</p>
                            </a>
                        `;
                    contentDiv.appendChild(storyDiv);
                });
            })
            .catch(error => console.error('Error loading books:', error));
    }
});