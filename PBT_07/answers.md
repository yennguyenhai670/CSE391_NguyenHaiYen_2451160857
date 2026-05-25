# PHIẾU BÀI TẬP 07
# **JAVASCRIPT BASICS — Variables, Data Types, Control Structures**
---
## PHẦN A — KIỂM TRA ĐỌC HIỂU
### Câu A1 — var / let / const
```javascript
// Đoạn 1
console.log(x);
var x = 5;
-Đoạn 1 (var): Ra undefined. Vì var bị kéo lên đầu (hoisting) nhưng chưa mang giá trị.
// Đoạn 2
console.log(y);
let y = 10;
- Đoạn 2 (let): Báo lỗi. Vì let cấm tuyệt đối việc dùng biến trước dòng khai báo.
// Đoạn 3
const z = 15;
z = 20;
console.log(z);
- Đoạn 3 (const): Báo lỗi. Vì const cấm dùng dấu = để gán lại giá trị mới.
// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
- Đoạn 4 (Mảng const): Ra [1, 2, 3, 4]. Vì const chỉ khóa mảng hiện tại không cho gán mảng khác, nhưng vẫn cho phép sửa ruột mảng (như .push()).

// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);

- Đoạn 5 (Phạm vi {}): Ra Trong block: 2 → Ngoài block: 1. Vì biến let nằm trong cặp ngoặc nhọn {} nào thì chỉ tồn tại trong đó, hai biến a là hoàn toàn độc lập.

```

### Câu A2 — Data Types & Coercion

Không chạy code, dự đoán kết quả:

```javascript
console.log(typeof null);             // "object"
console.log(typeof undefined);        // "undefined"
console.log(typeof NaN);             // "number"
console.log("5" + 3);                // "53"
console.log("5" - 3);                // 2
console.log("5" * "3");             // 15
console.log(true + true);           // 2
console.log([] + []);               // ""
console.log([] + {});               // "[object Object]"
console.log({} + []);                //"[object Object]"
```

`"5" + 3` và `"5" - 3` cho kết quả khác nhau Vì 
- Dấu +: Hễ có Chuỗi ➔ Tự ép thành Chuỗi ➔ Nối chuỗi ("5" + 3 = "53")
- Dấu -, *, /: Bắt buộc ép thành Số ➔ Tính toán ("5" - 3 = 2)

### Câu A3 — So sánh == vs ===

Dự đoán `true` hay `false`:

```javascript
console.log(5 == "5");                // True
console.log(5 === "5");               // False
console.log(null == undefined);       // True
console.log(null === undefined);      // False
console.log(NaN == NaN);             // False
console.log(0 == false);             // True
console.log(0 === false);            // False
console.log("" == false);            // True
```

**Quy tắc:** `===` luôn đúng vì 
- === kiểm tra chặt chẽ cả Giá trị lẫn Kiểu dữ liệu. Nó không tự ý ép kiểu ngầm định, giúp tránh các lỗi vô lý (ví dụ: "" == false)
- Ngoại lệ duy nhất: Dùng biến == null khi bạn muốn kiểm tra gộp cả null và undefined cùng một lúc.


### Câu A4 — Truthy & Falsy
1. Các giá trị Falsy trong JavaScript (Chỉ có 6 giá trị)
- false
- 0 (Bao gồm cả -0 và 0n)
- "" (Chuỗi rỗng, không có ký tự nào)
- null
- undefined
- NaN
2. Dự đoán kết quả
```javascript
if ("0") console.log("A");           // In "A"
if ("") console.log("B");            // Không in "B"
if ([]) console.log("C");            // In "C"
if ({}) console.log("D");            // In "D"
if (null) console.log("E");          // Không in "E"
if (0) console.log("F");             // Không in "F"
if (-1) console.log("G");            // In "G"
if (" ") console.log("H");           // In "H"
```

### Câu A5— Template Literals
```javascript
// Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```
## PHẦN C — SUY LUẬN
### Câu C1 — Debug JavaScript
1. if (giaSauGiam = 0) -> === 0: Dùng sai toán tử gán thay vì so sánh bằng.
2. for (var i... -> let i (Lỗi ẩn): let tạo phạm vi khối (block scope), giúp setTimeout lưu đúng giá trị i (0 đến 4) ở mỗi vòng lặp thay vì luôn in ra 5.
3. "100000" -> 100000: Truyền đúng kiểu dữ liệu số thay vì chuỗi.
4. Kiểu trả về lộn xộn: Đã đổi thành ném lỗi (throw new Error) thay vì return chuỗi văn bản khi thông số sai.
5. Thiếu kiểm tra đầu vào: Đã thêm điều kiện bắt buộc giaBan phải là số và >= 0.
6. Khai báo biến: Đã thay var bằng const để code an toàn và chuẩn hiện đại.
- Sửa lỗi
```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (typeof giaBan !== 'number' || giaBan < 0) {
        throw new Error("Giá bán phải là số và >= 0");
    }

    if (phanTramGiam < 0 || phanTramGiam > 100) {
        throw new Error("Phần trăm giảm không hợp lệ");
    }
    
    const giamGia = (giaBan * phanTramGiam) / 100;
    const giaSauGiam = giaBan - giamGia;
    
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Test
try {
    const gia = tinhGiaGiamGia(100000, 20);
    console.log("Giá sau giảm: " + gia + "đ");

    const gia2 = tinhGiaGiamGia(50000, 110); 
    console.log("Giá: " + gia2);
} catch (error) {
    console.error("Lỗi: " + error.message);
}

// Vòng lặp bất đồng bộ
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
```
### Câu C2 — Bài toán thực tế
- Ở file restaurant_bill.js

