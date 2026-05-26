const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const phoneInput = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");
const validity = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

// 1. Validate Tên (2 - 50 ký tự)
nameInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    const icon = document.getElementById("nameIcon");
    
    if (val.length >= 2 && val.length <= 50) {
        icon.textContent = "✅";
        validity.name = true;
    } else {
        icon.textContent = val.length > 0 ? "❌" : "";
        validity.name = false;
    }
    checkOverallValidity();
});

// 2. Validate Email (Regex)
emailInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    const errorEl = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val.length === 0) {
        errorEl.textContent = "";
        validity.email = false;
    } else if (!emailRegex.test(val)) {
        errorEl.textContent = "Email không hợp lệ!";
        validity.email = false;
    } else {
        errorEl.textContent = "";
        validity.email = true;
    }
    checkOverallValidity();
});

// 3. Validate Password Strength
passwordInput.addEventListener("input", (e) => {
    const val = e.target.value;
    const bar = document.getElementById("strengthBar");
    const text = document.getElementById("strengthText");
    const hasLetters = /[a-zA-Z]/.test(val);
    const hasNumbers = /[0-9]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    let strength = 0;

    if (val.length === 0) {
        bar.style.width = "0%";
        text.textContent = "";
        validity.password = false;
    } else if (val.length < 8) {
        bar.style.width = "33%";
        bar.style.backgroundColor = "#dc3545";
        text.textContent = "Yếu";
        text.style.color = "#dc3545";
        validity.password = false; 
    } else if (hasUpper && hasLower && hasNumbers && hasSpecial) {
        bar.style.width = "100%";
        bar.style.backgroundColor = "#28a745"; 
        text.textContent = "Mạnh";
        text.style.color = "#28a745";
        validity.password = true;
    } else if (hasLetters && hasNumbers) {
        bar.style.width = "66%";
        bar.style.backgroundColor = "#ffc107";
        text.textContent = "Trung bình";
        text.style.color = "#d39e00";
        validity.password = true;
    } else {
        bar.style.width = "33%";
        bar.style.backgroundColor = "#dc3545";
        text.textContent = "Yếu (Cần chữ + số)";
        text.style.color = "#dc3545";
        validity.password = false;
    }

    confirmInput.dispatchEvent(new Event("input"));
    checkOverallValidity();
});

// 4. Validate Confirm Password
confirmInput.addEventListener("input", (e) => {
    const val = e.target.value;
    const errorEl = document.getElementById("confirmError");
    
    if (val.length === 0) {
        errorEl.textContent = "";
        validity.confirm = false;
    } else if (val !== passwordInput.value) {
        errorEl.textContent = "Mật khẩu không khớp!";
        validity.confirm = false;
    } else {
        errorEl.textContent = "";
        validity.confirm = true;
    }
    checkOverallValidity();
});

// 5. Format Phone và Validate (0901-234-567)
phoneInput.addEventListener("input", (e) => {
    let raw = e.target.value.replace(/\D/g, '').substring(0, 10);
    let formatted = "";
    if (raw.length > 0) formatted = raw.substring(0, 4);
    if (raw.length > 4) formatted += "-" + raw.substring(4, 7);
    if (raw.length > 7) formatted += "-" + raw.substring(7, 10);
    
    e.target.value = formatted;
    
    const errorEl = document.getElementById("phoneError");
    if (raw.length === 0) {
        errorEl.textContent = "";
        validity.phone = false;
    } else if (raw.length < 10) {
        errorEl.textContent = "Vui lòng nhập đủ 10 số";
        validity.phone = false;
    } else {
        errorEl.textContent = "";
        validity.phone = true;
    }
    checkOverallValidity();
});

// XỬ LÝ NÚT SUBMIT & MODAL
function checkOverallValidity() {
    const isAllValid = validity.name && validity.email && validity.password && validity.confirm && validity.phone;
    submitBtn.disabled = !isAllValid;
}
form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const modal = document.getElementById("successModal");
    const modalData = document.getElementById("modalData");
    modalData.innerHTML = `
        <p><strong>Họ Tên:</strong> ${nameInput.value}</p>
        <p><strong>Email:</strong> ${emailInput.value}</p>
        <p><strong>SĐT:</strong> ${phoneInput.value}</p>
    `;

   
    modal.classList.remove("hidden");
});
document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("successModal").classList.add("hidden");
    
    form.reset();
    document.getElementById("nameIcon").textContent = "";
    document.getElementById("strengthBar").style.width = "0%";
    document.getElementById("strengthText").textContent = "";
    
    for (let key in validity) validity[key] = false;
    checkOverallValidity();
});