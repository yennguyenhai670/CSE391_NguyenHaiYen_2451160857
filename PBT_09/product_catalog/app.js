// 1. DATA: 12 Sản phẩm, 4 Categories
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200x150?text=iPhone+16", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung S24 Ultra", price: 31990000, category: "phone", image: "https://placehold.co/200x150?text=S24+Ultra", rating: 4.8, inStock: true },
    { id: 3, name: "Pixel 9 Pro", price: 22990000, category: "phone", image: "https://placehold.co/200x150?text=Pixel+9", rating: 4.6, inStock: false },
    { id: 4, name: "MacBook Pro M3", price: 45990000, category: "laptop", image: "https://placehold.co/200x150?text=MacBook+Pro", rating: 4.9, inStock: true },
    { id: 5, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/200x150?text=Dell+XPS", rating: 4.7, inStock: true },
    { id: 6, name: "ThinkPad X1 Carbon", price: 38990000, category: "laptop", image: "https://placehold.co/200x150?text=ThinkPad", rating: 4.8, inStock: true },
    { id: 7, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/200x150?text=iPad+Pro", rating: 4.8, inStock: true },
    { id: 8, name: "Galaxy Tab S9", price: 21990000, category: "tablet", image: "https://placehold.co/200x150?text=Tab+S9", rating: 4.5, inStock: true },
    { id: 9, name: "Xiaomi Pad 6", price: 8990000, category: "tablet", image: "https://placehold.co/200x150?text=Xiaomi+Pad", rating: 4.2, inStock: true },
    { id: 10, name: "AirPods Pro 2", price: 6190000, category: "accessory", image: "https://placehold.co/200x150?text=AirPods", rating: 4.7, inStock: true },
    { id: 11, name: "Magic Mouse", price: 2490000, category: "accessory", image: "https://placehold.co/200x150?text=Magic+Mouse", rating: 4.0, inStock: true },
    { id: 12, name: "Logitech MX Master 3", price: 2890000, category: "accessory", image: "https://placehold.co/200x150?text=MX+Master", rating: 4.9, inStock: true }
];

// 2. STATE
let activeCategory = "all";
let activeSearch = "";
let activeSort = "default";
let cartCount = 0;

// 3. DOM ELEMENTS
const container = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const sortSelect = document.getElementById("sortSelect");
const cartBadge = document.getElementById("cartBadge");
const darkModeToggle = document.getElementById("darkModeToggle");
const modalOverlay = document.getElementById("modalOverlay");
// CÁC HÀM XỬ LÝ CHÍNH
// 4. Render danh sách sản phẩm bằng JS
function renderProducts(items) {
    container.textContent = ""; // Xóa trắng lưới cũ
    
    if (items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Không tìm thấy sản phẩm nào!</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.id = prod.id; // Gắn id để bắt sự kiện click Modal

        const img = document.createElement("img");
        img.src = prod.image;
        img.alt = prod.name;

        const title = document.createElement("h3");
        title.textContent = prod.name;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = prod.price.toLocaleString("vi-VN") + "đ";

        const rating = document.createElement("p");
        rating.className = "rating";
        rating.textContent = "⭐ " + prod.rating;

        const btn = document.createElement("button");
        btn.className = "add-to-cart-btn";
        btn.textContent = prod.inStock ? "Thêm vào giỏ" : "Hết hàng";
        btn.disabled = !prod.inStock;
        if(!prod.inStock) btn.style.background = "#ccc";

        // Gắn vào thẻ card
        card.append(img, title, price, rating, btn);
        fragment.append(card);
    });

    container.append(fragment);
}

// 5. Hàm lọc tổng hợp 
function updateCatalog() {
    // a. Lọc category
    let result = activeCategory === "all" 
        ? [...products] 
        : products.filter(p => p.category === activeCategory);

    // b. Lọc search
    if (activeSearch) {
        result = result.filter(p => p.name.toLowerCase().includes(activeSearch.toLowerCase()));
    }

    // c. Sort
    if (activeSort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (activeSort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (activeSort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (activeSort === "rating-desc") result.sort((a, b) => b.rating - a.rating);

    renderProducts(result);
}

// Các hàm cập nhật State và gọi hàm render tổng hợp
function searchProducts(keyword) {
    activeSearch = keyword;
    updateCatalog();
}

function filterByCategory(cat) {
    activeCategory = cat;
    updateCatalog();
}

function sortProducts(sortType) {
    activeSort = sortType;
    updateCatalog();
}

// 6. Hàm render Modal chi tiết bằng JS
function openModal(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    modalOverlay.textContent = ""; // Xóa rác modal cũ

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const closeBtn = document.createElement("span");
    closeBtn.className = "close-modal";
    closeBtn.textContent = "✖";
    closeBtn.onclick = () => modalOverlay.classList.add("hidden");

    const img = document.createElement("img");
    img.src = prod.image;
    img.style.width = "100%";

    const title = document.createElement("h2");
    title.textContent = prod.name;
    title.style.margin = "15px 0";

    const price = document.createElement("p");
    price.textContent = `Giá: ${prod.price.toLocaleString("vi-VN")}đ`;
    price.style.fontSize = "20px";
    price.style.color = "var(--primary-color)";

    const status = document.createElement("p");
    status.textContent = prod.inStock ? "Trạng thái: Còn hàng" : "Trạng thái: Đã hết hàng";

    modalContent.append(closeBtn, img, title, price, status);
    modalOverlay.append(modalContent);
    
    modalOverlay.classList.remove("hidden");
}
// EVENT LISTENERS
// Search
searchInput.addEventListener("input", (e) => searchProducts(e.target.value));

// Sort
sortSelect.addEventListener("change", (e) => sortProducts(e.target.value));

// Filter Categories (Event Delegation)
categoryFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("cat-btn")) {
        // Đổi màu nút active
        document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        
        filterByCategory(e.target.dataset.cat);
    }
});


container.addEventListener("click", (e) => {
    // Xử lý click Nút "Thêm vào giỏ"
    if (e.target.classList.contains("add-to-cart-btn")) {
        cartCount++;
        cartBadge.textContent = cartCount;
        
        cartBadge.style.transform = "scale(1.5)";
        setTimeout(() => cartBadge.style.transform = "scale(1)", 200);
        return; 
    }

    const card = e.target.closest(".product-card");
    if (card) {
        const id = Number(card.dataset.id);
        openModal(id);
    }
});


modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add("hidden");
    }
});

// Dark mode toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});


updateCatalog();