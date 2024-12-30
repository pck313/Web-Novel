document.addEventListener("DOMContentLoaded", function() {
    fetch('/data/index.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.querySelector('.content');

            data.stories.forEach(story => {
                const storyDiv = document.createElement('div');
                storyDiv.classList.add('story');
                storyDiv.innerHTML = `
                    <a href="books.html?story=${encodeURIComponent(story.url)}" class="book-link"
                       data-id="${story.url}"
                       data-title="${story.title}"
                       data-cover="${story.cover}">
                        <img src="${story.cover}" alt="${story.title}">
                        <p>${story.title}</p>
                    </a>
                `;
                contentDiv.appendChild(storyDiv);
            });

            const bookLinks = document.querySelectorAll('.book-link');
            bookLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    const bookId = link.dataset.id;
                    const title = link.dataset.title;
                    const cover = link.dataset.cover;

                    addToHistory({ id: bookId, title: title, cover: cover });
                });
            });
        })
        .catch(error => console.error('Error loading stories:', error));
});

function addToHistory(story) {
    let history = JSON.parse(localStorage.getItem('history')) || [];

    if (!history.some(existingStory => existingStory.id === story.id)) {
        history.push(story);
        localStorage.setItem('history', JSON.stringify(history));
    }
}
