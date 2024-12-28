document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const storyUrl = urlParams.get('story');

    fetch('https://raw.githubusercontent.com/pck313/DataWebNovel/refs/heads/main/data/books.json')
        .then(response => response.json())
        .then(data => {
            const book = data.books.find(book => book.url === storyUrl);

            if (book) {
                document.getElementById('book-title').innerText = book.title;
                document.getElementById('book-title-header').innerText = book.title;
                document.getElementById('book-author').innerText = `Tác giả: ${book.author}`;
                document.getElementById('book-status').innerText = `Tình trạng: ${book.status}`;
                document.getElementById('book-genre').innerText = `Thể loại: ${book.genre}`;
                document.getElementById('book-description').innerText = `Nội dung: ${book.description}`;
                document.getElementById('book-cover').src = book.cover;

                const chapterList = document.getElementById('chapter-list');
                book.chapters.forEach(chapter => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = `chapters.html?book=${encodeURIComponent(book.url)}&chapter=${encodeURIComponent(chapter.url)}`;
                    a.innerText = chapter.title;
                    li.appendChild(a);
                    chapterList.appendChild(li);
                });
            } else {
                console.error('Book not found');
            }
        })
        .catch(error => console.error('Error loading book:', error));
});
