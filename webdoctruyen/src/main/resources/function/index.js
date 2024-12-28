document.addEventListener("DOMContentLoaded", function() {
    fetch('/data/index.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.querySelector('.content');
            data.stories.forEach(story => {
                const storyDiv = document.createElement('div');
                storyDiv.classList.add('story');
                storyDiv.innerHTML = `
                    <a href="books.html?story=${encodeURIComponent(story.url)}">
                        <img src="${story.cover}" alt="${story.title}">
                        <p>${story.title}</p>
                    </a>
                `;
                contentDiv.appendChild(storyDiv);
            });
        })
        .catch(error => console.error('Error loading stories:', error));
});

function addToHistory(story) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(JSON.parse(decodeURIComponent(story)));
    localStorage.setItem('history', JSON.stringify(history));
}

