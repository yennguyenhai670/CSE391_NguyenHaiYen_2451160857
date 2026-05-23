
// 1. KHỞI TẠO MẢNG & DOM ELEMENTS

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskContainer = document.getElementById('taskContainer');
const modal = document.getElementById('taskModal');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCancel = document.getElementById('btnCancel');
const taskForm = document.getElementById('taskForm');
const modalTitle = document.getElementById('modalTitle');
const notification = document.getElementById('notification');

// 2. CÁC HÀM CỐT LÕI (CRUD & UI)


function renderTasks() {
    taskContainer.innerHTML = '';
    
    if (tasks.length === 0) {
        taskContainer.innerHTML = '<p style="text-align: center; width: 100%; color: #666;">Chưa có công việc nào. Hãy thêm mới!</p>';
        return;
    }

    tasks.forEach((task, index) => {
        // Cắt chữ đầu của Mức ưu tiên (Cao -> Cao, Trung bình -> Trung) để gán class CSS
        const priorityClass = `priority-${task.priority.split(' ')[0]}`;
        const completedClass = task.isCompleted ? 'completed' : '';
        const checkedAttr = task.isCompleted ? 'checked' : '';

        const card = document.createElement('div');
        card.className = `task-card ${priorityClass} ${completedClass}`;
        
        card.innerHTML = `
            <div class="task-header">
                <h3 class="task-title">${task.title}</h3>
            </div>
            <p class="task-desc">${task.description || 'Không có mô tả'}</p>
            <div class="task-meta">
                <span>📅 Hạn: ${task.dueDate || 'Không có'}</span>
                <span>🔥 Mức độ: ${task.priority}</span>
            </div>
            <div class="task-actions">
                <label class="checkbox-container">
                    <input type="checkbox" class="chk-complete" data-index="${index}" ${checkedAttr}>
                    Hoàn thành
                </label>
                <div class="action-buttons">
                    <button class="btn btn-edit" data-index="${index}">Sửa</button>
                    <button class="btn btn-danger btn-delete" data-index="${index}">Xóa</button>
                </div>
            </div>
        `;
        taskContainer.appendChild(card);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.isCompleted).length;
    const pending = total - completed;

    document.getElementById('statTotal').innerText = total;
    document.getElementById('statCompleted').innerText = completed;
    document.getElementById('statPending').innerText = pending;
}

function resetForm() {
    taskForm.reset();
    document.getElementById('editIndex').value = '-1';
    modalTitle.innerText = 'Thêm mới Công việc';
    modal.classList.add('hidden');
    clearErrors();
}

function showNotification(message, type = 'success') {
    notification.innerText = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 3000);
}


// 3. MODULE VALIDATION


function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(`error-${inputId}`); 
    if(inputElement && errorElement) {
        inputElement.classList.add('input-error');
        errorElement.innerText = message;
        errorElement.classList.add('active');
    }
}

function clearErrors() {
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.error-message').forEach(el => {
        el.innerText = '';
        el.classList.remove('active');
    });
}

function validateForm() {
    let isValid = true;
    clearErrors();

    const title = document.getElementById('taskTitle').value.trim();
    if (title === '') {
        showError('taskTitle', 'Tiêu đề không được để trống.');
        isValid = false;
    }

    // Đề bài không bắt buộc Hạn hoàn thành, có thể kiểm tra định dạng ngày nếu cần
    
    return isValid;
}

// 4. XỬ LÝ SỰ KIỆN (EVENT HANDLING)


btnOpenModal.addEventListener('click', () => {
    resetForm();
    modal.classList.remove('hidden');
});

btnCancel.addEventListener('click', resetForm);

// Sự kiện Thêm/Sửa
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    if (!validateForm()) return; 

    const editIndex = document.getElementById('editIndex').value;
    
    const taskData = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDesc').value,
        dueDate: document.getElementById('dueDate').value,
        priority: document.getElementById('priority').value,
        // Nếu là thêm mới thì mặc định chưa xong. Nếu đang sửa, giữ nguyên trạng thái cũ.
        isCompleted: editIndex === '-1' ? false : tasks[editIndex].isCompleted 
    };

    if (editIndex === '-1') {
        tasks.push(taskData);
        showNotification('Thêm công việc thành công!');
    } else {
        tasks[editIndex] = taskData;
        showNotification('Cập nhật công việc thành công!');
    }

    saveTasks();
    renderTasks();
    updateStatistics();
    resetForm();
});

// Event Delegation cho nút Sửa, Xóa và Đổi trạng thái
taskContainer.addEventListener('click', function(e) {
    const target = e.target;
    
    // Nút Sửa
    if (target.classList.contains('btn-edit')) {
        const index = target.getAttribute('data-index');
        const task = tasks[index];

        document.getElementById('editIndex').value = index;
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDesc').value = task.description;
        document.getElementById('dueDate').value = task.dueDate;
        document.getElementById('priority').value = task.priority;

        modalTitle.innerText = 'Cập nhật Công việc';
        clearErrors();
        modal.classList.remove('hidden');
    }

    // Nút Xóa
    if (target.classList.contains('btn-delete')) {
        const index = target.getAttribute('data-index');
        if (confirm(`Bạn có chắc chắn muốn xóa công việc "${tasks[index].title}"?`)) {
            tasks.splice(index, 1); 
            saveTasks();
            renderTasks();
            updateStatistics();
            showNotification('Đã xóa công việc.', 'error'); 
        }
    }
});

// Lắng nghe sự kiện "change" trên ô Checkbox trạng thái
taskContainer.addEventListener('change', function(e) {
    if (e.target.classList.contains('chk-complete')) {
        const index = e.target.getAttribute('data-index');
        // Đảo ngược trạng thái hiện tại bằng giá trị của checkbox
        tasks[index].isCompleted = e.target.checked; 
        
        saveTasks();
        renderTasks(); // Render lại để cập nhật giao diện thẻ (gạch ngang)
        updateStatistics(); // Cập nhật lại số đếm đã xong/chưa xong
    }
});


// 5. INIT

renderTasks();
updateStatistics();