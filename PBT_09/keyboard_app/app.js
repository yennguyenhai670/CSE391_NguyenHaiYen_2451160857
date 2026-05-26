//DATA 
const images = Array.from({ length: 9 }, (_, i) => `https://placehold.co/800x500?text=Image+${i + 1}`);

const commands = [
    { id: "dark", name: "Chuyển đổi Giao diện (Dark/Light Mode)" },
    { id: "alert", name: "Hiện thông báo (Alert)" },
    { id: "open_gallery", name: "Mở xem ảnh số 1" },
    { id: "print", name: "In trang này (Print)" }
];

// STATE 
let currentIndex = 0;
let slideshowInterval = null;
let isModalOpen = false;
let isCmdOpen = false;
let lastFocusedElement = null;

//DOM ELEMENTS
const galleryContainer = document.getElementById("gallery");
const imageModal = document.getElementById("imageModal");
const fullImage = document.getElementById("fullImage");
const slideshowStatus = document.getElementById("slideshowStatus");
const cmdPalette = document.getElementById("cmdPalette");
const cmdInput = document.getElementById("cmdInput");
const cmdList = document.getElementById("cmdList");

//1. RENDER GALLERY
function renderGallery() {
    const fragment = document.createDocumentFragment();
    images.forEach((src, index) => {
        const btn = document.createElement("button");
        btn.className = "gallery-item";
        btn.setAttribute("aria-label", `Xem ảnh ${index + 1}`);
        btn.tabIndex = 0; 
        
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Ảnh thu nhỏ ${index + 1}`;
        btn.append(img);
        btn.addEventListener("click", () => openModal(index));
        
        fragment.append(btn);
    });
    galleryContainer.append(fragment);
}

//2. MODAL & SLIDESHOW LOGIC
function openModal(index) {
    lastFocusedElement = document.activeElement; 
    currentIndex = index;
    updateModalImage();
    imageModal.classList.remove("hidden");
    isModalOpen = true;

    document.getElementById("closeModalBtn").focus();
}

function closeModal() {
    imageModal.classList.add("hidden");
    isModalOpen = false;
    stopSlideshow();
    // Trả lại focus
    if (lastFocusedElement) lastFocusedElement.focus();
}

function updateModalImage() {
    fullImage.src = images[currentIndex];
    fullImage.alt = `Ảnh số ${currentIndex + 1}`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateModalImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModalImage();
}

function toggleSlideshow() {
    if (slideshowInterval) {
        stopSlideshow();
    } else {
        slideshowStatus.textContent = "Trạng thái: Đang chạy tự động (Phím Space để dừng)";
        slideshowInterval = setInterval(nextImage, 2000);
    }
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    slideshowStatus.textContent = "Trạng thái: Đang dừng (Phím Space để Play)";
}
document.getElementById("closeModalBtn").addEventListener("click", closeModal);
document.getElementById("nextBtn").addEventListener("click", nextImage);
document.getElementById("prevBtn").addEventListener("click", prevImage);


// 3. COMMAND PALETTE LOGIC
function openCmdPalette() {
    lastFocusedElement = document.activeElement;
    isCmdOpen = true;
    cmdPalette.classList.remove("hidden");
    cmdInput.value = "";
    renderCommands(commands);
    cmdInput.focus();
}

function closeCmdPalette() {
    isCmdOpen = false;
    cmdPalette.classList.add("hidden");
    if (lastFocusedElement) lastFocusedElement.focus();
}

function renderCommands(list) {
    cmdList.textContent = "";
    list.forEach((cmd, index) => {
        const li = document.createElement("li");
        li.className = "cmd-item";
        li.textContent = cmd.name;
        li.setAttribute("role", "option");
        
       
        li.addEventListener("click", () => executeCommand(cmd.id));
        cmdList.append(li);
    });
}

function executeCommand(id) {
    closeCmdPalette();
    setTimeout(() => {
        switch(id) {
            case "dark": document.body.classList.toggle("dark-mode"); break;
            case "alert": alert("Bạn vừa thực thi lệnh từ Command Palette!"); break;
            case "open_gallery": openModal(0); break;
            case "print": window.print(); break;
        }
    }, 100);
}


cmdInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = commands.filter(c => c.name.toLowerCase().includes(keyword));
    renderCommands(filtered);
});


//4. GLOBAL KEYBOARD SHORTCUTS 
window.addEventListener("keydown", (e) => {
    //COMMAND PALETTE
    if (e.ctrlKey && e.key === "k") {
        e.preventDefault(); // Chặn thanh search của trình duyệt
        isCmdOpen ? closeCmdPalette() : openCmdPalette();
        return;
    }

    // TRONG COMMAND PALETTE 
    if (isCmdOpen) {
        if (e.key === "Escape") closeCmdPalette();
        if (e.key === "Enter") {
            const firstCmd = cmdList.querySelector(".cmd-item");
            if (firstCmd) firstCmd.click(); // Thực thi lệnh đầu tiên
        }
        return;
    }

    // TRONG MODAL ẢNH
    if (isModalOpen) {
        switch (e.key) {
            case "Escape": closeModal(); break;
            case "ArrowRight": nextImage(); break;
            case "ArrowLeft": prevImage(); break;
            case " ":
                e.preventDefault(); 
                toggleSlideshow();
                break;
        }
        if (e.key >= "1" && e.key <= "9") {
            const num = parseInt(e.key) - 1;
            if (num < images.length) {
                currentIndex = num;
                updateModalImage();
            }
        }
    }
});


renderGallery();