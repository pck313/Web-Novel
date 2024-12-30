document.addEventListener("DOMContentLoaded", function() {
    let history = JSON.parse(localStorage.getItem('history')) || [];

    const contentDiv = document.querySelector('.content');
    history.forEach(story => {
        const storyDiv = document.createElement('div');
        storyDiv.classList.add('story');
        storyDiv.innerHTML = `
            <a href="books.html?story=${encodeURIComponent(story.id)}" class="book-link"
               data-id="${story.id}"
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
            const storyUrl = link.dataset.id;
            if (storyUrl) {
                window.location.href = `books.html?story=${storyUrl}`;
            } else {
                console.error("Story URL is undefined");
            }
        });
    });
});
