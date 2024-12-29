// Hàm xử lý tìm kiếm khi người dùng nhấn Enter hoặc nhấn vào nút tìm kiếm
function searchImage() {
    const searchQuery = document.getElementById('search-input').value.trim();

    // Kiểm tra nếu có ký tự nhập vào
    if (searchQuery) {
        // Không tự động chuyển trang khi người dùng chỉ đang nhập
        window.location.href = `search.html?query=${encodeURIComponent(searchQuery)}`;
    }
}

// Lắng nghe sự kiện khi người dùng nhấn Enter
document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchImage();
    }
});

// Lắng nghe sự kiện khi người dùng nhấn vào nút tìm kiếm
document.querySelector('.search-button').addEventListener('click', function() {
    searchImage();
});
