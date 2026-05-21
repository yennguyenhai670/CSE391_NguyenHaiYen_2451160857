# PHIẾU BÀI TẬP 03
## PHẦN A 
### Câu A1 — 3 Cách nhúng CSS
### 1. Inline CSS (Nhúng trực tiếp)
Viết CSS thẳng vào thuộc tính `style` của thẻ HTML.
- **vd Code:** `<h1 style="color: red;">Text</h1>`
- **Ưu điểm:** Nhanh, độ ưu tiên cao nhất.
- **Nhược điểm:** Code rối, không tái sử dụng được, khó bảo trì.
- **Dùng khi:** Test code nhanh, code Email HTML, hoặc dùng JavaScript can thiệp style động. 

### 2. Internal CSS (Nhúng trong file HTML)
Viết CSS vào thẻ `<style>`, thường đặt trong thẻ `<head>`.
- **Code:** 
  ```html
  <style> h1 { color: blue; } </style>
- **Ưu điểm**: Style gom gọn 1 chỗ trên trang, không tốn thêm HTTP request.
- **Nhược điểm**: Làm nặng file HTML, không thể dùng chung cho các file HTML khác.
- **Dùng khi**: Làm Landing page (trang đơn), hoặc một trang có style quá đặc thù không liên quan đến toàn hệ thống.
### 3. External CSS (Tạo file riêng)
Viết CSS ra file .css độc lập, nhúng vào HTML bằng thẻ `<link>`.

`Code: <link rel="stylesheet" href="styles.css">`
- **Ưu điểm** điểm: Tái sử dụng tối đa (1 file cho toàn bộ web), HTML sạch sẽ, tối ưu tốc độ tải (nhờ cache trình duyệt).
- **Nhược điểm**: Tốn thêm 1 HTTP request ban đầu (không đáng kể).
- **Dùng khi**: Tiêu chuẩn ngành (Industry Standard) - bắt buộc dùng cho các dự án thực tế, nhiều trang.

### Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"? Giải thích tại sao.
- **INLINE** thắng

1. **Độ ưu tiên (Specificity)**: Inline CSS nhắm mục tiêu trực tiếp nhất nên luôn có trọng số cao nhất.

2. **Nguyên tắc Thác đổ (Cascade)**: Internal và External có trọng số ngang nhau. Nếu không có Inline, trình duyệt đọc từ trên xuống dưới ở thẻ <head>, cái nào được gọi sau cùng sẽ thắng.

3. **Ngoại lệ (The Boss): Từ khóa !important (VD: color: blue !important;)** ở bất kỳ đâu sẽ phá vỡ mọi quy tắc và ghi đè tất cả (kể cả Inline).



### Câu A2— CSS Selectors — Dự đoán kết quả

Cho HTML sau:

```html
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
    </main>
</div>
```

```css
1. h1                           → Chọn: ShopTLU
-Bộ chọn thẻ (Element selector), tìm tất cả thẻ `<h1>`.
2. .price                       → Chọn: 25.990.000đ và 45.990.000đ
-Bộ chọn class, tìm tất cả phần tử có class là `price`.
3. #app header                  → Chọn:Shop TLU, home, product,about
-Bộ chọn con cháu (Descendant selector). Tìm thẻ <header> nằm bên trong phần tử có id là app.  Nó chọn cả khối header chứ không chỉ riêng các thẻ <a>.
4. nav a:first-child             → Chọn: Home
-Chọn thẻ <a> là đứa con đầu tiên nằm trong thẻ <nav>.
5. .product.featured h2         → Chọn: MacBook Pro
-.product.featured(viết liền không khoảng trắng) nghĩa là tìm thẻ có đồng thời cả 2 class này (chính là article của MacBook). Sau đó tìm thẻ <h2> nằm trong nó.
6. article > p                  → Chọn: 25.990.000đ, Mô tả sản phẩm... (của iPhone) VÀ 45.990.000đ, Mô tả sản phẩm... (của MacBook)
-Ký hiệu > là bộ chọn con trực tiếp (Child selector). Nó sẽ lấy tất cả các thẻ <p> nằm ngay sát lớp bên trong của thẻ <article>. Vì mỗi <article> có 2 thẻ <p>, nên tổng cộng nó chọn được 4 thẻ.
7. a[href="/"]                  → Chọn:Home
-Bộ chọn thuộc tính (Attribute selector). Tìm thẻ <a> nào có chính xác thuộc tính href="/".
8. .top-bar.dark h1              → Chọn: ShopTLU
-Giải thích: Tìm phần tử có đồng thời class top-bar và dark (chính là thẻ header), sau đó chọn thẻ <h1> nằm bên trong nó.
```
### Câu A3— Box Model — Tính toán kích thước
```css
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 450px(w,p,b)
→ Không gian chiếm trên trang = 470px

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 350px
→ Không gian chiếm trên trang = 420px

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px
→ KHÔNG PHẢI 65px vì Margin ngang (trái/phải) KHÔNG bị collapse. Chỉ margin dọc (trên/dưới) mới bị chúng kh cộng dồn mà lấy cái lớn nhất
```

**Nâng cao:** Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`,
TL:Khoảng cách = 30px

### Câu A4 (5đ) — Specificity (Độ ưu tiên)

Cho các CSS rules sau cùng target 1 element `<p class="price" id="main-price">`:

```css
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */
```
### Đáp án: Specificity (Độ ưu tiên)

**1. Tính specificity score (a, b, c) cho mỗi rule:**
Cách tính điểm dựa trên công thức `(ID, Class/Attribute/Pseudo-class, Element/Pseudo-element)`:
- **Rule A (`p`):** Chỉ có 1 thẻ. 
  → Score: **(0, 0, 1)**
- **Rule B (`.price`):** Chỉ có 1 class. 
  → Score: **(0, 1, 0)**
- **Rule C (`#main-price`):** Có 1 ID. 
  → Score: **(1, 0, 0)**
- **Rule D (`p.price`):** Có 1 thẻ và 1 class. 
  → Score: **(0, 1, 1)**

**2. Element sẽ có màu gì? Giải thích:**
- **Màu:** Đỏ (Red) - Nhận từ Rule C.
- **Giải thích:** Dựa vào điểm Specificity tính ở trên, `(1, 0, 0)` của Rule C là điểm cao nhất (ID luôn lớn hơn Class và Element). Do đó, Rule C ghi đè tất cả các rule còn lại.

**3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu gì?**
- **Màu:** Cam (Orange).
- **Giải thích:** Đây là Inline CSS. Inline CSS có độ ưu tiên cao hơn tất cả các ID, Class hay Element Selectors (điểm của nó có thể coi là `1, 0, 0, 0`). Do đó nó sẽ đánh bại Rule C.

**4. Nếu Rule A thêm `!important`, element có màu gì? Tại sao?**
- **Màu:** Đen (Black) - Nhận từ Rule A (`p { color: black !important; }`).
- **Giải thích:** Từ khóa `!important` là "kẻ phá luật" trong CSS. Khi một thuộc tính được gắn `!important`, nó sẽ bỏ qua toàn bộ hệ thống tính điểm Specificity (kể cả Inline CSS) và bắt buộc trình duyệt phải áp dụng giá trị đó. Do đó, dù Rule A chỉ là Element Selector yếu ớt, nhờ `!important` nó lại trở thành kẻ chiến thắng.

## PHẦN B — Thực hành
### B1:Liệt kê 5 loại Selector đã sử dụng trong file `style.css`:

1. **Universal Selector (Bộ chọn tất cả):**
   - `* { box-sizing: border-box; }`
   - *Tác dụng:* Chọn toàn bộ các phần tử trên trang để reset model hộp (box model).

2. **Element Selector (Bộ chọn thẻ HTML):**
   - `body`, `nav`, `main`, `footer`
   - *Tác dụng:* Định dạng kiểu dáng cơ bản, bao quát cho các thẻ cấu trúc chính của trang.

3. **ID Selector (Bộ chọn định danh):**
   - `#main-header`
   - *Tác dụng:* Nhắm mục tiêu chính xác và duy nhất vào thẻ Header của trang để thiết lập background gradient.

4. **Class Selector (Bộ chọn lớp):**
   - `.skills-table`, `.active`
   - *Tác dụng:* Định dạng riêng cho bảng hiển thị kỹ năng và làm nổi bật liên kết (link) đang ở trạng thái active.

5. **Descendant Selector (Bộ chọn con cháu):**
   - `nav a`, `.skills-table th`
   - *Tác dụng:* Tìm và định dạng các thẻ `<a>` nằm bên trong `<nav>`, hoặc các thẻ `<th>` nằm trong bảng `.skills-table` mà không làm ảnh hưởng đến các thẻ cùng tên ở vị trí khác.

6. **Pseudo-class Selector (Bộ chọn trạng thái / giả lớp):**
   - `nav a:hover`, `tr:nth-child(even)`, `tr:hover`
   - *Tác dụng:* Bắt các trạng thái tương tác của người dùng (khi rê chuột vào link, rê chuột vào hàng của bảng) và thực hiện Zebra striping (đổi màu xen kẽ các hàng chẵn).


### B3-Specificity Battle
### 1. Liệt kê 10 rules + Specificity score
*(Công thức tính: Số ID, Số Class/Thuộc tính, Số Thẻ HTML)*

1. `*`                           → Specificity: **0,0,0** (Màu gray)
2. `p`                           → Specificity: **0,0,1** (Màu pink)
3. `.text`                       → Specificity: **0,1,0** (Màu blue)
4. `p.text`                      → Specificity: **0,1,1** (Màu green)
5. `.text.highlight`             → Specificity: **0,2,0** (Màu orange)
6. `p.text.highlight`            → Specificity: **0,2,1** (Màu purple)
7. `#demo`                       → Specificity: **1,0,0** (Màu red)
8. `p#demo`                      → Specificity: **1,0,1** (Màu brown)
9. `#demo.text.highlight`        → Specificity: **1,2,0** (Màu teal)
10. `p#demo.text.highlight`      → Specificity: **1,2,1** (Màu gold)

### 2. Element cuối cùng hiển thị màu gì? Tại sao?
- **Kết quả:** Chữ "Hello World" sẽ hiển thị màu **vàng (gold)**.
- **Tại sao:** Trình duyệt sẽ so sánh điểm số Specificity của tất cả các rules. Bộ chọn số 10 (`p#demo.text.highlight`) có điểm số cao nhất là **1,2,1** (gồm 1 ID `#demo`, 2 class `.text .highlight`, và 1 thẻ `p`). Do đó, nó đánh bại hoàn toàn 9 rules còn lại.

### 3. Screenshot kết quả
*[Chèn ảnh chụp màn hình trình duyệt hiển thị chữ "Hello World" màu gold tại đây]*

### 4. Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.
- **Kết quả:** Khi xáo trộn vị trí của 10 rules này trong file CSS, màu sắc của element **KHÔNG HỀ THAY ĐỔI** (vẫn là màu gold).
- **Giải thích:** Nguyên tắc **Thác đổ (Cascade - thứ tự ưu tiên từ trên xuống)** chỉ có tác dụng khi hai CSS rules có **ĐIỂM SPECIFICITY BẰNG NHAU HOÀN TOÀN**. Lúc đó rule nào nằm dưới cùng mới "thắng". Tuy nhiên, 10 rules trong bài tập này đều có điểm Specificity **khác biệt nhau**. Theo luật của CSS, Specificity luôn ưu tiên xét trước Cascade. Kẻ có điểm Specificity cao nhất sẽ luôn thắng bất kể nó được đặt ở dòng đầu tiên hay dòng cuối cùng của file CSS.

## PHẦN C — DEBUG & SUY LUẬN 
### Câu C1 — Debug CSS Layout
```css
.container {
    width: 960px;
    margin: 0 auto;
}
.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

1. Chiều rộng **thực tế** của sidebar:342px  và content (content-box!): 722px
2. Layout bị vỡ vì Container rộng `960px`, sidebar + content phải nằm **cạnh nhau**. Nhưng content bị đẩy xuống dòng mới và Layout bị vỡ tổng kích thước thực tế của hai khối con cộng lại lên tới 1064px (1064px > 960px).
3. Đưa ra **2 cách sửa** khác nhau (1 cách dùng border-box, 1 cách không dùng)

- Cách 1: Sử dụng box-sizing: border-box (Cách khuyên dùng hiện nay)Khi thêm thuộc tính này, trình duyệt sẽ khóa cứng chiều rộng tổng bằng đúng giá trị width bạn khai báo. Padding và Border sẽ bị ép mọc ngược vào trong thay vì phình ra ngoài.Lúc này tổng chiều rộng sẽ chuẩn xác là: 300 + 660 = 960px(vừa khít container).

- Cách 2: Tính toán trừ hao thủ công (Giữ nguyên content-box)Nếu không dùng border-box, bạn phải tự trừ đi phần padding và border để tìm ra giá trị width (vùng nội dung) sao cho khi cộng thêm viền và lề, nó bằng đúng kích thước ban đầu.
4. Tạo file `debug_layout.html` + `debug_layout.css` chứng minh cả 2 cách sửa hoạt động -- Ở MỤC C1



### Câu C2— Cascade Puzzle

Cho CSS file:

```css
body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }
```

Và HTML:

```html
<body>
    <div class="container">
        <div class="card" id="featured">
            <h2 class="title highlight">Sản phẩm A</h2>
            <p>Mô tả sản phẩm</p>
        </div>

        <div class="card">
            <h2 class="title">Sản phẩm B</h2>
            <p class="highlight">Mô tả sản phẩm B</p>
        </div>
    </div>
</body>
```

Trả lời:
1. "Sản phẩm A" (h2) có `font-size` = 20px và `color` = green
2. "Mô tả sản phẩm" (p trong card featured) có `color` = blue
3. "Sản phẩm B" (h2) có `font-size` = 20px và `color` = blue
4. "Mô tả sản phẩm B" (p.highlight) có `color` = green



