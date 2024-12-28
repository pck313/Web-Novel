const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbnovel'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// Tạo API endpoint để lấy danh sách chương
app.get('/api/chapters', (req, res) => {
    let sql = 'SELECT * FROM chapters WHERE book_id = 1'; // Thay đổi ID sách ở đây nếu cần
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
