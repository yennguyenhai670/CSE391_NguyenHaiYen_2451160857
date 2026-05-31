const form = document.querySelector('#todoForm'); // querySelector thì CÓ dấu #
const input = document.getElementById('todoInput'); // getElementById thì KHÔNG dấu #
const list = document.getElementById('todoList');   // getElementById thì KHÔNG dấu #

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;

    const li = document.createElement('li');
    li.textContent = input.value;

    li.addEventListener('click', () => {
        li.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");    
    deleteBtn.textContent = 'Xóa';
    deleteBtn.addEventListener('click', () => li.remove());
    
    li.appendChild(deleteBtn);
    list.appendChild(li);
    input.value = '';
    input.focus();
});