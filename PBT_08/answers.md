# PHIẾU BÀI TẬP 08
# **JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS**
## PHẦN A — KIỂM TRA ĐỌC HIỂU
### Câu A1 — Function Declaration vs Expression vs Arrow

Viết **cùng 1 hàm** `tinhThueBaoHiem(luong)` theo 3 cách:
1. Function Declaration
- function tinhThueBaoHiem1(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
}
2. Function Expression
- const tinhThueBaoHiem2 = function(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
};
3. Arrow Function
- const tinhThueBaoHiem3 = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
};

### Sự khác nhau về Hoisting
- Hoisting là cơ chế của JavaScript tự động đưa phần khai báo lên đầu phạm vi (scope) trước khi chạy code thực tế
- Function Declaration: Được hoisting toàn bộ (cả tên hàm và nội dung hàm). Bạn có thể gọi hàm một cách bình thường trước khi viết code định nghĩa nó.
- Function Expression & Arrow Function: Do khai báo kèm với const hoặc let, các hàm này không được khởi tạo trước khi dòng code chạy tới (nằm trong vùng Temporal Dead Zone - TDZ). Nếu gọi trước khi định nghĩa, chương trình sẽ báo lỗi ngay lập tức.

### Câu A2 — Scope & Closure
```javascript
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
// Output sau 200ms: var: 3 var: 3 var: 3
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
// Output sau 200ms: let: 0 let: 1 let: 2
```

2.  `var` và `let` cho kết quả khác nhau trong vòng lặp setTimeout vì:setTimeout chạy sau khi vòng lặp đã kết thúc
- var i (Function scope): Cả vòng lặp chỉ dùng chung 1 biến i duy nhất. Khi vòng lặp chạy xong, i đã bằng 3. Lúc này 3 hàm setTimeout mới chạy và cùng lấy giá trị biến i đó ➔ In ra 3, 3, 3.
- let j (Block scope): Mỗi lần lặp tạo ra 1 biến j mới và độc lập. Mỗi hàm setTimeout sẽ "ghi nhớ" (closure) biến j riêng biệt của chính vòng lặp chứa nó ➔ In ra đúng thứ tự 0, 1, 2.

### Câu A3— Array Methods
```javascript
1. const evens = nums.filter(n => n % 2 === 0); → [2, 4, 6, 8, 10]
2. 2. const multiplied = nums.map(n => n * 3); → [3, 6, 9, ..., 30]
3. const sum = nums.reduce((acc, n) => acc + n, 0);→ 55
4. const firstGreaterThan7 = nums.find(n => n > 7); → 8
5. const hasGreaterThan10 = nums.some(n => n > 10);→ false
6. const allGreaterThan0 = nums.every(n => n > 0);→ true
7. const strArray = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);→ ["Số 1 là lẻ", "Số 2 là chẵn", ...]
8. const reversed = [...nums].reverse();→ [10, 9, ..., 1]
```

### Câu A4— Object Destructuring & Spread
```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  //"iPhone 16" 25990000 8 "Titan" 
console.log(specs);                     // Lỗi ReferenceError: specs is not defined
- Cú pháp specs: { ram, color } có nghĩa là "vào trong thuộc tính specs, lấy ra ram và color làm biến độc lập". Nó KHÔNG tạo ra một biến tên là specs. Vì vậy, gọi console.log(specs) sẽ gây lỗi
// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000  
- Việc dùng ...product để tạo object mới sẽ không làm ảnh hưởng đến object gốc product đối với các thuộc tính ở cấp đầu tiên (cấp 1).
// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        //16
- oán tử Spread (...) chỉ thực hiện Shallow Copy (Copy nông). Nghĩa là với các thuộc tính là kiểu nguyên thủy (như chuỗi, số), nó copy giá trị. Nhưng với các thuộc tính lồng sâu (nested object) như specs, nó chỉ copy địa chỉ tham chiếu vùng nhớ.
```
## PHẦN C — SUY LUẬN
### Câu C1— Refactor Code
Code sau hoạt động đúng nhưng viết rất tệ. **Refactor** sử dụng array methods + arrow functions:

```javascript
const processOrders = (orders) => orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total,
        discount: total * 0.1,
        finalTotal: total * 0.9 // total - (total * 0.1)
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);

```
1. Destructuring: Rút trích trực tiếp { status, total } và { id, customer, total } ngay tại tham số của arrow function để code gọn hơn, không cần phải gọi order.status hay order.total lặp đi lặp lại.
2. .filter(): Thay thế cho câu lệnh if lồng nhau để lọc ra các đơn hàng "completed" và có total > 100000.
3. .map(): Thay thế cho việc tạo object tạm (var item = {}) và result.push(). Tính toán luôn discount và finalTotal và trả về object mới.
4. .sort(): Thay thế cho 2 vòng lặp for lồng nhau (thuật toán Bubble Sort cũ) bằng hàm sort mặc định của mảng cực kỳ ngắn gọn.
5. Chaining (Nối chuỗi hàm): Nối tiếp filter().map().sort() giúp dữ liệu chảy tuần tự từ trên xuống dưới, cực kỳ dễ đọc


### Câu C2 — Thiết kế API
```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue !== undefined ? initialValue : arr[0];
        let startIndex = initialValue !== undefined ? 0 : 1;
        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

//TEST
console.log(miniArray.map([1, 2, 3], x => x * 2));          
// → [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    
// → [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); 
// → 10
```
1. map: Tạo mảng trống, lặp qua mảng gốc, gọi fn với từng phần tử và push kết quả của hàm đó vào mảng mới.
2. filter: Lặp qua mảng gốc, nếu gọi fn(phần_tử) mà trả về true (thỏa mãn điều kiện) thì mới push phần tử đó vào mảng mới.
3. reduce: Cần xử lý logic cho initialValue. Nếu người dùng có truyền initialValue, biến tích lũy (accumulator) sẽ bắt đầu bằng giá trị đó và vòng lặp chạy từ vị trí 0. Nếu người dùng bỏ trống, accumulator lấy luôn arr[0] làm giá trị đầu tiên và vòng lặp bắt đầu chạy từ vị trí 1.
