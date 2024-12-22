// Loại bỏ dấu trong chuỗi
function removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Tìm kiếm theo tên
function searchImages() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const normalizedSearchInput = removeDiacritics(searchInput);

    const images = document.querySelectorAll('.story');
    const resultContainer = document.getElementById('search-results'); // Container để hiển thị kết quả

    // Xóa kết quả tìm kiếm cũ
    resultContainer.innerHTML = '';

    images.forEach(image => {
        const imageName = image.getAttribute('data-name').toLowerCase(); // Lấy kết quả từ ô tìm kiếm
        const normalizedImageName = removeDiacritics(imageName); // Bỏ các dấu

        if (normalizedImsageName.includes(normalizedSearchInput)) {
            image.style.display = 'block';

            // Tạo liên kết cho ảnh tìm thấy
            const imageLink = document.createElement('a');
            imageLink.href = image.querySelector('img').src;
            imageLink.textContent = imageName;

            // Thêm liên kết vào container kết quả
            resultContainer.appendChild(imageLink);
            resultContainer.appendChild(document.createElement('br')); // Dòng xuống
        } else {
            image.style.display = 'none';
        }
    });
}

function handleSearch(event) {
    // Kiểm tra xem phím Enter có được nhấn hoặc nút tìm kiếm có được nhấp không
    if (event.type === 'click' || event.key === 'Enter') {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        localStorage.setItem('searchQuery', searchInput); // Lưu từ khóa tùm kiếm
        window.location.href = 'search.html'; // Chuyển hướng đến trang khác
    }
}

// Gán sự kiện cho thanh tìm kiếm và nút tìm kiếm
document.getElementById('search-input').addEventListener('keydown', handleSearch);
document.querySelector('.search-button').addEventListener('click', handleSearch);
