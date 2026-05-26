// 1. STATE MANAGEMENT & LOCAL STORAGE
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// 2. DOM ELEMENTS
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCountSpan = document.querySelector("#todoCount strong");
const filtersContainer = document.getElementById("filters");
const clearCompletedBtn = document.getElementById("clearCompleted");

// 3. RENDER FUNCTION (Dùng createElement 100%, KHÔNG innerHTML cho item)
function renderTodos() {
    // Xóa list cũ an toàn
    todoList.textContent = "";

    // Lọc data theo trạng thái
    let filteredTodos = todos;
    if (currentFilter === "active") filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === "completed") filteredTodos = todos.filter(t => t.completed);

    // DocumentFragment giúp chống Reflow DOM nhiều lần
    const fragment = document.createDocumentFragment();

    filteredTodos.forEach(todo => {
        // Tạo thẻ <li>
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id; // Lưu id vào thẻ li để dễ bề xử lý ở Event Delegation

        // Div chứa UI hiển thị
        const viewDiv = document.createElement("div");
        viewDiv.className = "view";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "toggle";
        checkbox.checked = todo.completed;

        const label = document.createElement("label");
        label.textContent = todo.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "destroy";
        deleteBtn.textContent = "❌";

        viewDiv.append(checkbox, label, deleteBtn);

        // Input dùng khi Edit
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit";
        editInput.value = todo.text;

        li.append(viewDiv, editInput);
        fragment.append(li);
    });

    todoList.append(fragment);

    // Cập nhật Count
    const activeCount = todos.filter(t => !t.completed).length;
    todoCountSpan.textContent = activeCount;

    // Lưu vào LocalStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 4. ADD TODO
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ id: Date.now(), text, completed: false });
        todoInput.value = "";
        renderTodos();
    }
});

// 5. EVENT DELEGATION: Xóa, Toggle, Mở form Edit (Lắng nghe toàn bộ click/dblclick trên <ul>)
todoList.addEventListener("click", (e) => {
    const li = e.target.closest(".todo-item");
    if (!li) return;
    
    const id = Number(li.dataset.id);

    // Nút Xóa
    if (e.target.classList.contains("destroy")) {
        todos = todos.filter(t => t.id !== id);
        renderTodos();
    }
    // Nút Checkbox
    else if (e.target.classList.contains("toggle")) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        renderTodos();
    }
});

todoList.addEventListener("dblclick", (e) => {
    if (e.target.tagName === "LABEL") {
        const li = e.target.closest(".todo-item");
        li.classList.add("editing");
        const editInput = li.querySelector(".edit");
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
    }
});

// 6. XỬ LÝ LƯU SAU KHI EDIT (Enter để lưu, Esc để hủy)
todoList.addEventListener("keydown", (e) => {
    if (e.target.classList.contains("edit")) {
        if (e.key === "Enter" || e.key === "Escape") {
            e.target.blur();
        }
    }
});

todoList.addEventListener("focusout", (e) => {
    if (e.target.classList.contains("edit")) {
        const li = e.target.closest(".todo-item");
        if (!li.classList.contains("editing")) return; 

        const id = Number(li.dataset.id);
        const newText = e.target.value.trim();

        if (newText) {
            const todo = todos.find(t => t.id === id);
            todo.text = newText;
        } else {
            todos = todos.filter(t => t.id !== id);
        }
        renderTodos();
    }
});

// 7. FILTERS & CLEAR COMPLETED
filtersContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        
        currentFilter = e.target.dataset.filter;
        renderTodos();
    }
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    renderTodos();
});

// 8. KHỞI TẠO LẦN ĐẦU
renderTodos();