document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookUrl = urlParams.get('book');
    const chapterUrl = urlParams.get('chapter');

    fetch('/data/books.json')
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

function navigateToPresentChapter() {
    const url = document.getElementById('chapter-title-link').getAttribute('data-url');
    if (url) {
        window.location.href = url;
    }
}

// Kiểm tra có phải chương đầu tiên trong danh sách
function isFirstChapter(chapterUrl, chapters) {
    const currentChapterIndex = parseInt(chapterUrl.match(/chapter(\d+)/)[1], 10);

    let smallestChapterIndex = currentChapterIndex;
    chapters.forEach(chapter => {
        const chapterIndex = parseInt(chapter.url.match(/chapter(\d+)/)[1], 10);
        if (chapterIndex < smallestChapterIndex) {
            smallestChapterIndex = chapterIndex;
        }
    });

    return currentChapterIndex === smallestChapterIndex;
}

function navigateToPreviousPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const storyUrl = urlParams.get('book');
    const chapterUrl = urlParams.get('chapter');

    const chapterPrefixMatch = chapterUrl.match(/^(\/story\d+\/chapter)/);
    const chapterPrefix = chapterPrefixMatch ? chapterPrefixMatch[1] : '';
    let chapterIndex = parseInt(chapterUrl.match(/chapter(\d+)/)[1], 10);

    fetch('/data/books.json')
        .then(response => response.json())
        .then(data => {
            const book = data.books.find(book => book.url === storyUrl);
            if (book) {
                const chapters = book.chapters;
                if (!isFirstChapter(chapterUrl, chapters)) {
                    chapterIndex -= 1;
                    const newChapterUrl = `${chapterPrefix}${chapterIndex.toString().padStart(2, '0')}`;
                    window.location.href = `chapters.html?book=${encodeURIComponent(storyUrl)}&chapter=${encodeURIComponent(newChapterUrl)}`;
                } else {
                    window.location.href = `books.html?book=${encodeURIComponent(storyUrl)}`;
                }
            }
        })
}

function navigateToNextPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const storyUrl = urlParams.get('story');
    let chapterIndex = parseInt(urlParams.get('chapter'));

    fetch('/data/books.json')
        .then(response => response.json())
        .then(data => {
            const book = data.books.find(book => book.url === storyUrl);
            if (book) {
                const maxChapterIndex = book.chapters.length;
                if (chapterIndex < maxChapterIndex) {
                    chapterIndex += 1;
                    window.location.href = `chapters.html?story=${storyUrl}&chapter=${chapterIndex}`;
                } else {
                    alert('Đây là chương cuối cùng');
                }
            }
        })
        .catch(error => console.error('Lỗi khi tải sách:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const storyUrl = urlParams.get('story');
    const chapterIndex = parseInt(urlParams.get('chapter'));

    fetch('/data/chapters.json')
        .then(response => response.json())
        .then(data => {
            const chapter = data.chapters.find(
                chap => chap.storyUrl === storyUrl && chap.chapterIndex === chapterIndex
            );

            if (chapter) {
                document.getElementById('chapter-title').innerText = chapter.title;
                document.getElementById('chapter-content').innerText = chapter.content;

                const prevChapterIndex = chapterIndex - 1;
                const nextChapterIndex = chapterIndex + 1;

                const bookUrl = `book-details.html?story=${storyUrl}`;
                document.getElementById('book-title-link').setAttribute('data-url', bookUrl);

                document.getElementById('prev-page').onclick = function() {
                    navigateToChapter('prev');
                };

                document.getElementById('next-page').onclick = function() {
                    navigateToChapter('next');
                };
            } else {
                console.error('Chapter not found');
            }
        })
        .catch(error => console.error('Error loading chapter:', error));
});



