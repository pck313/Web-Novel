async function fetchChapters() {
    try {
        const response = await fetch('/api/chapters');
        const chapters = await response.json();
        const chapterList = document.getElementById('chapter-list');

        chapters.forEach(chapter => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="/story1/chapter${chapter.id}">${chapter.chapter_title}</a>`;
            chapterList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching chapters:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchChapters);
