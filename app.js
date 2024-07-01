const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();

// Sử dụng body-parser để xử lý dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Thiết lập thư mục chứa file tĩnh
app.use(express.static('public'));

// API endpoint để lấy tất cả các công việc
app.get('/api/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ tasks: rows });
  });
});

// API endpoint để thêm công việc
app.post('/api/tasks', (req, res) => {
  const taskName = req.body.name;
  const sql = 'INSERT INTO tasks (name) VALUES (?)';
  db.run(sql, [taskName], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// API endpoint để xóa công việc
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.run(sql, [taskId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deletedID: taskId });
  });
});

// API endpoint để sửa công việc
app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const newTaskName = req.body.name;
  const sql = 'UPDATE tasks SET name = ? WHERE id = ?';
  db.run(sql, [newTaskName, taskId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ updatedID: taskId });
  });
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
