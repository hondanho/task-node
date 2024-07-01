document.addEventListener('DOMContentLoaded', function() {
    const addTaskForm = document.getElementById('add-task-form');
    const taskNameInput = document.getElementById('task-name');
    const backBtn = document.getElementById('back-btn');
  
    // Quay lại trang chủ
    backBtn.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  
    // Thêm công việc mới
    addTaskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskName = taskNameInput.value;
  
      fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: taskName })
      })
        .then(response => response.json())
        .then(task => {
          window.location.href = 'index.html';
        });
    });
  });
  