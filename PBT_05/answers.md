# PHIẾU BÀI TẬP 05
# **CSS RESPONSIVE & SCSS — Responsive Design, Media Queries, Sass**
## PHẦN A 
### Câu A1— Viewport & Mobile-First

1. Viết chính xác thẻ `<meta viewport>` chuẩn. Giải thích từng thuộc tính.

### ```<meta name="viewport" content="width=device-width, initial-scale=1.0">```
- width=device-width: Ép chiều rộng của trang web bằng đúng với chiều rộng vật lý của màn hình thiết bị.
- initial-scale=1.0: Đặt mức thu phóng ban đầu là 100% (không tự động phóng to hay thu nhỏ khi mới tải trang).

2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào? 
- Trình duyệt trên điện thoại sẽ giả định đây là trang web dành cho máy tính (thường rộng khoảng 980px) và tự động "thu nhỏ" toàn bộ trang lại để nhét vừa vào màn hình điện thoại. Kết quả là chữ và nút bấm sẽ bé xíu, người dùng phải zoom lên mới đọc được.

3. 
- Mobile-First: Code CSS cho giao diện điện thoại trước (mặc định), sau đó dùng @media (min-width) để phóng to/thêm cột cho màn hình lớn.
- vd: .box { width: 100%; } 
    @media (min-width: 768px) { .box { width: 50%; } }
- Desktop-First: Code CSS cho máy tính trước, sau đó dùng @media (max-width) để bóp nhỏ layout cho điện thoại.
- vd: .box { width: 50%; } 
@media (max-width: 768px) { .box { width: 100%; } }
- Nên dùng Mobile-First: Tối ưu hiệu suất cho điện thoại (tải ít code thừa hơn), ưu tiên tập trung vào nội dung và tính năng cốt lõi nhất trước khi mở rộng.
### Câu A2 — Breakpoints
- framework Bootstrap

| Breakpoint | Kích thước pixel | Thiết bị đại diện | Ví dụ: Lưới sản phẩm |
| :--- | :--- | :--- | :--- |
| **xs** (Extra small) | `< 576px` | Điện thoại thông minh (chế độ dọc) | 1 cột |
| **sm** (Small) | `≥ 576px` | Điện thoại thông minh (chế độ ngang) / Phablet | 2 cột |
| **md** (Medium) | `≥ 768px` | Máy tính bảng (Tablet/iPad) | 3 cột |
| **lg** (Large) | `≥ 992px` | Laptop / Màn hình desktop nhỏ | 4 cột |
| **xl** (Extra large) | `≥ 1200px` | Màn hình desktop lớn | 4 - 6 cột |
| **xxl** (Extra extra large)| `≥ 1400px` | Màn hình desktop rất lớn | 6 cột |

### Câu A3 — Media Queries
```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

| Chiều rộng màn hình | `.container` width |Giải thích|
|---------------------|--------------------|-----------|
| 375px (iPhone SE) | 100% |Nhỏ hơn 576px, nhận giá trị CSS mặc định |
| 600px | 540px |Lớn hơn 576px nhưng chưa tới 768px|
| 800px | 720px |Lớn hơn 768px nhưng chưa tới 992px|
| 1000px | 960px |Lớn hơn 992px nhưng chưa tới 1200px |
| 1400px | 1140px |Nằm trong khoảng từ 1200px trở lên |

### Câu A4 — SCSS Basics
1. Variables (`$primary-color`)
- Variables (Biến): Lưu các giá trị dùng chung (màu sắc, font) để tái sử dụng và dễ đổi hàng loạt.
- vd: $primary: #007bff;
    button { color: $primary; }
2. Nesting (viết CSS lồng nhau)
- Nesting (Lồng nhau): Viết CSS phân cấp theo cấu trúc HTML, code gọn và dễ đọc hơn.
- vd: nav { 
    ul { list-style: none; }
    }
3. Mixins (`@mixin`, `@include`)
- Mixins: Tạo ra một khối code (như một hàm) để gọi lại nhiều lần, có thể truyền tham số
- vd:@mixin flex-center { display: flex; align-items: center; justify-content: center; }
.box { @include flex-center; }
4. `@extend` / Inheritance
- @extend (Kế thừa): Cho phép một class sao chép toàn bộ thuộc tính của một class khác
- vd:.btn { padding: 10px; border: none; }
.btn-red { @extend .btn; background: red; }

- Trình duyệt KHÔNG đọc được file `.scss` vì nó chỉ hiểu được mã CSS thuần túy 
- Để chuyển SCSS → CSS cần sử dụng một trình biên dịch (Compiler) như Node Sass, Dart Sass, hoặc các extension cài trên VS Code (như Live Sass Compiler) để "dịch" file .scss thành file .css bình thường rồi mới nhúng file .css đó vào HTML

---

## PHẦN C — PHÂN TÍCH 

### Câu C1 — Phân tích trang web thực

Chọn 1 trang web nổi tiếng (Shopee, Tiki, VNExpress, YouTube).

1. Mở trang trên **3 kích thước màn hình** khác nhau (dùng DevTools Toggle Device):
### Mobile (375px)
- Navigation: Không có sidebar (thanh điều hướng bên trái). Navigation chuyển hoàn toàn thành Bottom Navigation Bar (thanh điều hướng dưới đáy màn hình) với các icon: Trang chủ, Shorts, Dấu +, Đăng ký, Thư viện. Hamburger menu biến mất.
- Lưới content (Grid): Hiển thị 1 cột duy nhất. Ảnh thumbnail của video tràn viền (100% width) để tối ưu không gian chạm.
- Elements bị ẩn: Thanh tìm kiếm dài ở giữa top bar bị ẩn, thay bằng một icon kính lúp (khi bấm vào mới mở ra trang tìm kiếm riêng). Sidebar bên trái bị ẩn hoàn toàn.
- Font size: Tiêu đề video to và rõ ràng, text mô tả kênh thường bị cắt ngắn (truncate) hoặc thu nhỏ lại đôi chút để không chiếm quá nhiều không gian dọc.
### Tablet (768px)  
- Navigation: Bottom Navigation Bar biến mất. Xuất hiện lại Mini Sidebar ở bên trái (chỉ có icon, không có text đi kèm) cho các mục: Trang chủ, Shorts, Đăng ký, Thư viện. Thanh tìm kiếm ở trên cùng đã xuất hiện dạng input box đầy đủ.
- Lưới content (Grid): Lưới chuyển sang dạng 2 hoặc 3 cột tùy thuộc vào việc bạn đóng hay mở menu.
- Elements bị ẩn: Text mô tả trong sidebar bên trái vẫn bị ẩn để tiết kiệm diện tích, chỉ giữ lại icon.
- Font size: Kích thước chữ tiêu chuẩn, tiêu đề video được hiển thị dài hơn so với mobile trước khi bị cắt bằng dấu
### Desktop (1440px)
- Navigation :Full Sidebar xuất hiện bên trái với đầy đủ Icon + Text (Trang chủ, Shorts, Đăng ký, Kênh của bạn, Lịch sử...). Xuất hiện nút Hamburger menu ở góc trái trên cùng để người dùng có thể chủ động thu gọn sidebar này lại thành Mini Sidebar.
- Lưới content (Grid): Lưới mở rộng lên 4, 5 hoặc thậm chí 6 cột video. Khoảng cách (gap) giữa các video rộng và thoáng hơn.
- Elements bị ẩn: Bottom navigation của mobile hoàn toàn không tồn tại
- Font size: Font size giữ nguyên chuẩn desktop, nhưng layout rộng rãi cho phép hiển thị thêm nhiều metadata của video (số lượt xem, thời gian đăng, huy hiệu xác minh) mà không sợ bị rối mắt

### Câu C2 — Thiết kế Responsive Strategy
1. Mobile Wireframe (Dưới 768px)
+-------------------------+
| [Logo]             [📞] | 
+-------------------------+
|                         |
|       HERO IMAGE        |
|                         |
+-------------------------+
|      FORM ĐẶT BÀN       | 
| [Ngày]  [Giờ]  [Người]  |
| [Ghi chú ............]  |
|      [ ĐẶT NGAY ]       |
+-------------------------+
|       THỰC ĐƠN          |
| [Ảnh món 1] [Ảnh món 2] | 
| [Ảnh món 3] [Ảnh món 4] |
| [Ảnh món 5] [Ảnh món 6] |
+-------------------------+
|       BẢN ĐỒ MAPS       |
+-------------------------+
|         FOOTER          |
+-------------------------+
2. Tablet Wireframe (768px - 1023px)
+-----------------------------------+
| [Logo]             [Hotline: 1900]| 
+-----------------------------------+
|                                   |
|           HERO IMAGE              |
|                                   |
+-----------------------------------+
|            THỰC ĐƠN               |
|  [Ảnh 1]    [Ảnh 2]    [Ảnh 3]    | 
|  [Ảnh 4]    [Ảnh 5]    [Ảnh 6]    |
+-----------------------------------+
|  FORM ĐẶT BÀN   |   BẢN ĐỒ MAPS   | 
| [Ngày] [Giờ]    |                 |    
| [Số người]      |                 |
| [ĐẶT NGAY]      |                 |
+-----------------------------------+
|              FOOTER               |
+-----------------------------------+
3. Desktop Wireframe (Từ 1024px trở lên)
+---------------------------------------------------+
| [Logo]                        [Hotline: 1900 1234]|
+---------------------------------------------------+
|                                                   |
|                   HERO IMAGE                      |
|                                                   |
+---------------------------------+-----------------+
|           THỰC ĐƠN              |   FORM ĐẶT BÀN  | 
| [Ảnh 1]   [Ảnh 2]   [Ảnh 3]     |                 |   
| [Ảnh 4]   [Ảnh 5]   [Ảnh 6]     |  [Ngày] [Giờ]   |    
+---------------------------------+  [Số người]     |
|                                 |  [Ghi chú]      |
|          BẢN ĐỒ MAPS            |                 |
|                                 |  [ ĐẶT NGAY ]   |
+---------------------------------+-----------------+
|                      FOOTER                       |
+---------------------------------------------------+
- CSS skeleton
```css
.header       { grid-area: header; }
.hero         { grid-area: hero; }
.booking-form { grid-area: booking-form; }
.food-gallery { grid-area: food-gallery; }
.map          { grid-area: map; }
.footer       { grid-area: footer; }

/*1. MOBILE-FIRST (Mặc định cho màn hình < 768px)*/
.layout-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  
    "header"
    "hero"
    "booking-form" 
    "food-gallery"
    "map"
    "footer";
}

.food-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.header .phone-text {
  display: none; 
}

/* 2. TABLET (Từ 768px đến 1023px)*/
@media (min-width: 768px) {
  
  
  .header .phone-text { 
    display: inline; 
  } 
  .food-gallery {
    grid-template-columns: repeat(3, 1fr);
  }
  .layout-container {
    grid-template-columns: 1fr 1fr; 
    grid-template-areas:
      "header       header"
      "hero         hero"
      "food-gallery food-gallery"
      "booking-form map"         
      "footer       footer";
  }
}

/* 3. DESKTOP (Từ 1024px trở lên)*/
@media (min-width: 1024px) {

  .layout-container {
    grid-template-columns: 2fr 1fr; 
    grid-template-areas:
      "header       header"
      "hero         hero"
      "food-gallery booking-form" 
      "map          booking-form"
      "footer       footer";
  }

  .booking-form {
    position: sticky;
    top: 24px;
    align-self: start; 
  }
}



