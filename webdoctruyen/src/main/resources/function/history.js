// function/history.js

document.addEventListener("DOMContentLoaded", function() {
    const historyContainer = document.getElementById('history-container');
    const history = JSON.parse(localStorage.getItem('history')) || [];

    history.forEach(story => {
        const storyDiv = document.createElement('div');
        storyDiv.classList.add('story');
        storyDiv.innerHTML = `
            <a href="books.html?story=${encodeURIComponent(story.url)}">
                <img src="${story.cover}" alt="${story.title}">
                <p>${story.title}</p>
            </a>
        `;
        historyContainer.appendChild(storyDiv);
    });
});

function addToHistory(story) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(story);
    localStorage.setItem('history', JSON.stringify(history));
}
