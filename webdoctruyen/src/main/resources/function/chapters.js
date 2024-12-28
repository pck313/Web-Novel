document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookUrl = urlParams.get('book');
    const chapterUrl = urlParams.get('chapter');

    fetch('https://raw.githubusercontent.com/pck313/DataWebNovel/refs/heads/main/data/books.json')
        .then(response => response.json())
        .then(data => {
            const book = data.books.find(book => book.url === bookUrl);
            const chapter = book ? book.chapters.find(chapter => chapter.url === chapterUrl) : null;

            if (book && chapter) {
                document.getElementById('book-title').textContent = book.title;
                document.getElementById('book-title-link').setAttribute('data-url', `books.html?story=${encodeURIComponent(book.url)}`);

                document.getElementById('chapter-title').textContent = chapter.title;
                document.getElementById('chapter-title-link').setAttribute('data-url', `chapters.html?book=${encodeURIComponent(book.url)}&chapter=${encodeURIComponent(chapter.url)}`);

                document.getElementById('chapter-content').textContent = chapter.content;
            } else {
                console.error("Không tìm thấy dữ liệu sách hoặc chương.");
            }
        })
        .catch(error => console.error('Error loading JSON files:', error));
});

function navigateToBook() {
    const url = document.getElementById('book-title-link').getAttribute('data-url');
    if (url) {
        window.location.href = url;
    }
}

function navigateToChapter() {
    const url = document.getElementById('chapter-title-link').getAttribute('data-url');
    if (url) {
        window.location.href = url;
    }
}

