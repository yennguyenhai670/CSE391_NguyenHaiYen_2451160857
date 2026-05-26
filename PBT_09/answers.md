# PHIẾU BÀI TẬP 09
# **DOM MANIPULATION & EVENTS**
## PHẦN A — KIỂM TRA ĐỌC HIỂU
### Câu A1 — DOM Tree
1. Vẽ DOM tree (sơ đồ cây) cho HTML trên
div#app
 ├── header
 │    ├── h1 
 │    │    └── "Todo App" (Text Node)
 │    └── nav
 │         ├── a.active 
 │         │    └── "All" (Text Node)
 │         ├── a 
 │         │    └── "Active" (Text Node)
 │         └── a 
 │              └── "Completed" (Text Node)
 └── main
      ├── form#todoForm
      │    ├── input#todoInput [type="text"]
      │    └── button [type="submit"]
      │         └── "Add" (Text Node)
      └── ul#todoList
           ├── li.todo-item 
           │    └── "Learn HTML" (Text Node)
           └── li.todo-item.completed 
                └── "Learn CSS" (Text Node)
2. Viết **querySelector** cho mỗi yêu cầu:
- Chọn thẻ <h1>: document.querySelector('h1') (hoặc document.querySelector('header h1'))
- Chọn input trong form: document.querySelector('#todoInput') (hoặc document.querySelector('#todoForm input'))
- Chọn tất cả .todo-item: document.querySelectorAll('.todo-item') (Lưu ý: Phải dùng querySelectorAll để lấy danh sách).
- Chọn link đang active: document.querySelector('a.active')
- Chọn <li> đầu tiên trong #todoList: document.querySelector('#todoList li:first-child') (hoặc document.querySelector('#todoList li') vì querySelector mặc định lấy phần tử đầu tiên).
- Chọn tất cả <a> bên trong <nav>: document.querySelectorAll('nav a')

### Câu A2 — innerHTML vs textContent
1. Sự khác nhau giữa innerHTML và textContent
- innerHTML: Lấy ra hoặc thiết lập nội dung HTML bên trong một phần tử. Khi gán giá trị mới bằng innerHTML, trình duyệt sẽ phân tích cú pháp chuỗi đó thành các thẻ HTML (DOM nodes) và render chúng lên giao diện.
- textContent: Lấy ra hoặc thiết lập nội dung văn bản thuần túy (plain text). Nó bỏ qua tất cả các thẻ HTML, không phân tích cú pháp HTML. Bất kỳ thẻ nào được gán vào cũng sẽ bị biến thành chữ hiển thị thông thường.
- Dùng innerHTML khi thực sự muốn tạo ra các cấu trúc HTML mới (ví dụ: in ra một danh sách `<ul><li>...</li></ul>` từ dữ liệu an toàn của server).
- Dùng textContent khi bạn chỉ muốn hiển thị văn bản và đặc biệt là khi in ra dữ liệu do người dùng nhập vào, để đảm bảo an toàn.
2. Tại sao innerHTML gây lỗ hổng XSS?
- XSS (Cross-Site Scripting) xảy ra khi kẻ tấn công chèn các đoạn mã độc hại (thường là JavaScript) vào trang web của bạn.
- Vì innerHTML ra lệnh cho trình duyệt đọc và thực thi chuỗi truyền vào như một đoạn HTML/JS thực thụ, nên nếu dùng innerHTML để in dữ liệu người dùng nhập, các đoạn mã độc như thẻ <script> hoặc các thuộc tính sự kiện (như onerror, onload) sẽ bị kích hoạt. Hậu quả là hacker có thể đánh cắp cookie, token, hoặc điều khiển phiên đăng nhập của người dùng
3. Ví dụ và Cách sửa lỗi
```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput; 
```
- Chỉ cần thay innerHTML bằng textContent. Lúc này, trình duyệt sẽ coi toàn bộ đoạn ```<img src=x onerror="alert('Hacked!')">``` chỉ là một chuỗi văn bản vô hại và in nó ra màn hình dưới dạng chữ bình thường
### Câu A3— Event Bubbling
1. Code ban đầu (Không có e.stopPropagation()):
- Output: BUTTON ➔ INNER ➔ OUTER
- Do cơ chế Event Bubbling (nổi bọt), sự kiện truyền từ phần tử con trong cùng lên các phần tử cha.
2. Khi bỏ comment e.stopPropagation():
- Output: BUTTON
- Tại sao: Hàm này chặn quá trình nổi bọt. Sự kiện chỉ chạy ở #btn rồi dừng lại hẳn, không lan lên các thẻ cha nữa.
## PHẦN C — DEBUG & PHÂN TÍCH 
### Câu C1 — Debug DOM Code
1. Lỗi countDisplay.innerHTML = count; (Nhiều chỗ)
- Lỗi: Nên dùng textContent thay vì innerHTML khi chỉ muốn cập nhật văn bản để tránh lỗi hiển thị và tăng hiệu năng.
- Sửa: countDisplay.textContent = count;
2. Lỗi addEventListener("onclick", ...) ở #decrementBtn
- Lỗi: Tên sự kiện truyền vào addEventListener phải là tên rút gọn, không có chữ "on".
- Sửa: document.querySelector("#decrementBtn").addEventListener("click", function() { ... });
3. Lỗi countDisplay = count; ở #resetBtn 
- Lỗi: countDisplay là một phần tử DOM (được khai báo bằng const), không thể gán trực tiếp bằng một con số. Cần cập nhật nội dung của nó.
- Sửa: countDisplay.textContent = count;
4. Lỗi historyList.innerHTML = null; ở #resetBtn
- Lỗi: innerHTML nhận giá trị là chuỗi (string). Gán null có thể gây hành vi không mong muốn trên một số trình duyệt cũ hoặc bị ép kiểu thành chuỗi "null".
- Sửa: historyList.innerHTML = ""; (Gán bằng chuỗi rỗng).
5. Lỗi item.remove; ở #clearHistory
- Lỗi: remove là một phương thức (hàm), cần phải có dấu ngoặc đơn () để thực thi.
- Sửa: item.remove();
6. Lỗi count = localStorage.getItem("count"); ở sự kiện load
- Lỗi: localStorage luôn trả về chuỗi (string). Khi gán count = "5", các phép toán sau đó như count++ có thể chạy đúng (do JS tự ép kiểu ngầm), nhưng count + 1 sẽ bị lỗi nối chuỗi thành "51".
- Sửa: Cần parse về số và cung cấp giá trị mặc định nếu localStorage trống. Sửa thành: count = parseInt(localStorage.getItem("count")) || 0;
7. Lỗi thiếu việc nạp lại history trong sự kiện load
- Lỗi: Đoạn code lưu historyList.innerHTML vào localStorage lúc unload, nhưng lại quên không nạp lại nó khi tải trang. Hơn nữa, việc nạp nguyên cục HTML sẽ làm mất các Event Listener (nút deleteHistory) đã gắn bằng addEventListener trước đó.
- Sửa tạm thời (hiển thị UI): Thêm dòng historyList.innerHTML = localStorage.getItem("history") || ""; vào trong window.addEventListener("load").


```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;
    
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count; 
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count; 
    historyList.innerHTML = "";      
});

function deleteHistory(element) {
    element.remove(); 
}

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); 
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    count = parseInt(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    historyList.innerHTML = localStorage.getItem("history") || "";
});
```
### Câu C2 — Performance
1. Event Listener & Event Delegation
- Tội tại sao BAD: Gắn 1000 sự kiện làm ngốn RAM, chậm trang và không hoạt động với các phần tử mới được thêm vào sau này.
- Cách giải quyết (Event Delegation): Lợi dụng tính chất Nổi bọt (Bubbling), chỉ gắn 1 sự kiện duy nhất vào thẻ Cha. Dùng event.target để bắt xem đứa con nào vừa bị click. Vừa nhẹ máy, vừa ăn luôn cho cả phần tử động

2. Cho code:
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}
document.body.appendChild(fragment);
```
- Dùng Fragment: Gom hết 1000 phần tử vào "vùng nhớ ảo", rồi mới đưa lên giao diện cùng lúc ➔ Trình duyệt chỉ phải Reflow đúng 1 lần, tăng tốc độ đáng kể.
