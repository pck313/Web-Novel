
function searchImage() {
    const searchQuery = document.getElementById('search-input').value.trim();

    if (searchQuery) {
        window.location.href = `search.html?query=${encodeURIComponent(searchQuery)}`;
    }
}

document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchImage();
    }
});

document.querySelector('.search-button').addEventListener('click', function() {
    searchImage();
});
