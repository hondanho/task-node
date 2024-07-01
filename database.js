const sqlite3 = require('sqlite3').verbose();

// Mở kết nối đến cơ sở dữ liệu SQLite
const db = new sqlite3.Database('./todoDB.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the todoDB.sqlite database.');
});

// Tạo bảng tasks nếu chưa tồn tại
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
)`);

module.exports = db;
