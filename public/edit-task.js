document.addEventListener('DOMContentLoaded', function() {
    const editTaskForm = document.getElementById('edit-task-form');
    const taskIdInput = document.getElementById('task-id');
    const taskNameInput = document.getElementById('task-name');
    const backBtn = document.getElementById('back-btn');
  
    // Lấy thông tin công việc từ Local Storage
    const taskId = localStorage.getItem('editTaskId');
    const taskName = localStorage.getItem('editTaskName');
  
    taskIdInput.value = taskId;
    taskNameInput.value = taskName;
  
    // Quay lại trang chủ
    backBtn.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  
    // Cập nhật công việc
    editTaskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const newTaskName = taskNameInput.value;
  
      fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newTaskName })
      })
        .then(() => {
          window.location.href = 'index.html';
        });
    });
  });
  