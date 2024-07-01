document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
  
    // Chuyển đến trang thêm công việc
    addTaskBtn.addEventListener('click', function() {
      window.location.href = 'add-task.html';
    });
  
    // Lấy danh sách công việc từ server
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => {
        data.tasks.forEach(task => {
          addTaskToDOM(task);
        });
      });
  
    // Thêm công việc vào DOM
    function addTaskToDOM(task) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.name}</span>
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
      `;
  
      // Chỉnh sửa công việc
      li.querySelector('.edit-button').addEventListener('click', function() {
        localStorage.setItem('editTaskId', task.id);
        localStorage.setItem('editTaskName', task.name);
        window.location.href = 'edit-task.html';
      });
  
      // Xóa công việc
      li.querySelector('.delete-button').addEventListener('click', function() {
        fetch(`/api/tasks/${task.id}`, {
          method: 'DELETE'
        })
          .then(() => {
            li.remove();
          });
      });
  
      taskList.appendChild(li);
    }
  });
  