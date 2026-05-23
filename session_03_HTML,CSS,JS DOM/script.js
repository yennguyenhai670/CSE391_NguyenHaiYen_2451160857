// ==========================================
// 1. KHỞI TẠO MẢNG DỮ LIỆU & DOM ELEMENTS
// ==========================================
const defaultStudents = [
    { id: 'SV001', fullName: 'Nguyễn Hải Yến', dob: '2006-01-03', className: '66HTTT1', score: '8.5', email: 'yennguyenhai670@gmail.com' },
    { id: 'SV002', fullName: 'Ngọc Khánh', dob: '2006-01-23', className: '66HTTT1', score: '8.5', email: 'ntnk@gmail.com' },
    { id: 'SV003', fullName: 'Lê Minh Quân', dob: '2006-03-15', className: '66HTTT1', score: '9.0', email: 'leminhquan@example.com' },
    { id: 'SV004', fullName: 'Lê Văn A', dob: '2006-03-15', className: '66HTTT1', score: '9.0', email: 'leminhquan@example.com' },
    { id: 'SV005', fullName: 'Lê Văn B', dob: '2006-03-15', className: '66HTTT1', score: '9.0', email: 'leminhquan@example.com' }
];

let students = JSON.parse(localStorage.getItem('students'));
if (!students || !Array.isArray(students) || students.length === 0) {
    students = [...defaultStudents];
    saveStudents();
}

const modal = document.getElementById('studentModal');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCancel = document.getElementById('btnCancel');
const studentForm = document.getElementById('studentForm');
const studentBody = document.getElementById('studentBody');
const modalTitle = document.getElementById('modalTitle');
const notification = document.getElementById('notification');

// ==========================================
// 2. CÁC HÀM CHỨC NĂNG CỐT LÕI
// ==========================================

function renderStudents() {
    studentBody.innerHTML = '';
    
    if (students.length === 0) {
        studentBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Chưa có dữ liệu sinh viên.</td></tr>';
        return;
    }

    students.forEach((student, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.fullName}</td>
            <td>${student.dob}</td>
            <td>${student.className}</td>
            <td>${student.score}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn btn-warning btn-edit" data-index="${index}">Sửa</button>
                <button class="btn btn-danger btn-delete" data-index="${index}">Xóa</button>
            </td>
        `;
        studentBody.appendChild(tr);
    });
}

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function updateStatistics() {
    document.getElementById('totalStudents').innerText = students.length;
    
    if (students.length === 0) {
        document.getElementById('averageScore').innerText = '0.0';
        return;
    }

    const totalScore = students.reduce((sum, current) => sum + Number(current.score), 0);
    const avg = (totalScore / students.length).toFixed(1);
    document.getElementById('averageScore').innerText = avg;
}

function resetForm() {
    studentForm.reset();
    document.getElementById('editIndex').value = '-1'; 
    modalTitle.innerText = 'Thêm mới Sinh viên';
    modal.classList.add('hidden');
    clearErrors(); // Xóa lỗi khi đóng form
}

function showNotification(message, type = 'success') {
    notification.innerText = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

function isValidAge(dobString) {
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}

// ==========================================
// 3. MODULE VALIDATION
// ==========================================

function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(`error-${inputId}`); 
    
    if(inputElement && errorElement) {
        inputElement.classList.add('input-error');
        errorElement.innerText = message;
        errorElement.classList.add('active');
    } else {
        alert(`Lỗi ở ${inputId}: ${message}`); 
    }
}

function clearErrors() {
    const inputs = document.querySelectorAll('.input-error');
    const errors = document.querySelectorAll('.error-message');
    
    inputs.forEach(input => input.classList.remove('input-error'));
    errors.forEach(error => {
        error.innerText = '';
        error.classList.remove('active');
    });
}

function validateForm() {
    let isValid = true;
    clearErrors();

    const studentId = document.getElementById('studentId').value.trim();
    const idRegex = /^SV\d{3}$/; 
    if (studentId === '') {
        showError('studentId', 'Mã sinh viên không được để trống.');
        isValid = false;
    } else if (!idRegex.test(studentId)) {
         showError('studentId', 'Mã sinh viên phải có định dạng SVxxx (VD: SV001).');
         isValid = false;
    }

    const fullName = document.getElementById('fullName').value.trim();
    if (fullName === '') {
        showError('fullName', 'Họ và tên không được để trống.');
        isValid = false;
    }

    const dob = document.getElementById('dob').value;
    if (dob === '') {
        showError('dob', 'Vui lòng chọn ngày sinh.');
        isValid = false;
    } else if (!isValidAge(dob)) {
        showError('dob', 'Sinh viên phải từ đủ 18 tuổi trở lên.');
        isValid = false;
    }

    const score = document.getElementById('score').value;
    if (score === '') {
        showError('score', 'Điểm không được để trống.');
        isValid = false;
    } else if (isNaN(score) || Number(score) < 0 || Number(score) > 10) {
        showError('score', 'Điểm phải là số hợp lệ từ 0 đến 10.');
        isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('email', 'Email không được để trống.');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Email không đúng định dạng.');
        isValid = false;
    }

    return isValid;
}

// 4. XỬ LÝ SỰ KIỆN (EVENT HANDLING)


btnOpenModal.addEventListener('click', () => {
    resetForm();
    modal.classList.remove('hidden');
});

btnCancel.addEventListener('click', resetForm);

// Sự kiện Submit Form
studentForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    // GỌI HÀM VALIDATE Ở ĐÂY: Dừng lại nếu có bất kỳ lỗi nào
    if (!validateForm()) {
        return; 
    }

    const editIndex = document.getElementById('editIndex').value;
    
    // Lấy dữ liệu từ input (Sau khi đã vượt qua bước kiểm tra tuổi & dữ liệu)
    const studentData = {
        id: document.getElementById('studentId').value,
        fullName: document.getElementById('fullName').value,
        dob: document.getElementById('dob').value,
        className: document.getElementById('className').value,
        score: document.getElementById('score').value,
        email: document.getElementById('email').value
    };

    if (editIndex === '-1') {
        students.push(studentData);
        showNotification('Thêm sinh viên thành công!');
    } else {
        students[editIndex] = studentData;
        showNotification('Cập nhật thông tin thành công!');
    }

    saveStudents();
    renderStudents();
    updateStatistics();
    resetForm();
});

studentBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-edit')) {
        const index = e.target.getAttribute('data-index');
        const student = students[index];

        document.getElementById('editIndex').value = index;
        document.getElementById('studentId').value = student.id;
        document.getElementById('fullName').value = student.fullName;
        document.getElementById('dob').value = student.dob;
        document.getElementById('className').value = student.className;
        document.getElementById('score').value = student.score;
        document.getElementById('email').value = student.email;

        modalTitle.innerText = 'Cập nhật Sinh viên';
        clearErrors();
        modal.classList.remove('hidden');
    }

    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        
        if (confirm(`Bạn có chắc chắn muốn xóa sinh viên ${students[index].fullName}?`)) {
            students.splice(index, 1); 
            saveStudents();
            renderStudents();
            updateStatistics();
            showNotification('Đã xóa sinh viên.', 'error'); 
        }
    }
});

// 5. KHỞI CHẠY KHI TẢI TRANG

renderStudents();
updateStatistics();