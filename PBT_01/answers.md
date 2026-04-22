## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — HTTP & Browser
**Nguồn tham chiếu:** `01_introduction_html_universe.md` - Mục `1.1. Kiến trúc Client-Server` và `1.3. Browser Rendering`.

1. Khi bạn gõ `https://shopee.vn`:
- **DNS Lookup:** Trình duyệt tìm kiếm địa chỉ IP tương ứng với tên miền `shopee.vn`.
- **Establish Connection (TCP/TLS Handshake):** Thiết lập kết nối an toàn giữa máy tính của bạn và máy chủ Shopee.
- **HTTP Request:** Trình duyệt gửi yêu cầu (thường là phương thức GET) để lấy dữ liệu trang web.
- **Server Response:** Máy chủ Shopee xử lý và gửi lại các file (HTML, CSS, JS) cho trình duyệt.
- **Browser Rendering:** Trình duyệt đọc code (Parse), dựng khung xương (DOM), nạp phong cách (CSS) và hiển thị giao diện lên màn hình.

2. Trong DevTools của Chrome, tab **Network** cho thấy thông tin gì? 
- **Status Code của request đầu tiên:** 200 (Thành công).
- **Tổng thời gian load trang:** 31.34 s.
- **Request trả về file CSS:** File `bundle.9b0f374b...` có Type là `stylesheet`.

### Câu A2 (5đ) — Semantic HTML
**Nguồn tham chiếu**: File Chương 04.md - Mục 1.1. Semantic HTML5 và phần Bản đồ Semantic Elements.

1. Tại sao trang web dưới đây bị Google đánh giá SEO thấp? Liệt kê **ít nhất 4 lỗi semantic** và sửa lại.
- Trang web mắc lỗi "Div Soup" (lạm dụng thẻ <div>). Việc sử dụng các thẻ phi ngữ nghĩa khiến Google không thể phân tích được cấu trúc trang web: không biết đâu là phần đầu (header), nội dung chính (main) hay thông tin sản phẩm (article). Điều này làm giảm khả năng lập chỉ mục (index) nội dung chính xác, dẫn đến xếp hạng SEO thấp.
2. Liệt kê 4 lỗi Semantic và cách sửa:
| Lỗi hiện tại | Thẻ Semantic thay thế | Lý do |
| :--- | :--- | :--- |
| `<div class="header">` | `<header>` | Xác định đây là phần chứa Logo và menu chính. |
| `<div class="menu">` | `<nav>` | Đánh dấu đây là khu vực điều hướng (Navigation). |
| `<div class="main">` | `<main>` | Chỉ định vùng chứa nội dung chính của trang (duy nhất 1 thẻ mỗi trang). |
| `<div class="product">` | `<article>` | Dùng cho một nội dung độc lập như một sản phẩm cụ thể. |

3. Sửa code

<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h2>iPhone 16 Pro</h2>
        <p class="price">25.990.000đ</p>
        <figure>
            <img src="iphone.jpg" alt="iPhone 16 Pro">
        </figure>
    </article>
</main>

<footer>© 2026 ShopTLU</footer>

### Câu A3 (5đ) — Block vs Inline

Không chạy code, hãy **vẽ tay** (hoặc mô tả bằng text art) kết quả hiển thị của đoạn HTML sau. Giải thích tại sao.

```html
<div>Hộp 1</div>
<span>Text A</span>
<span>Text B</span>
<div>Hộp 2</div>
<span>Text C</span>
<strong>Text D</strong>
<div>Hộp 3</div>
```

### Câu A4 (5đ) — Table

Đọc chương 05. Giải thích sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`. Tại sao KHÔNG NÊN dùng table để tạo layout trang web? (Ghi rõ ít nhất 3 lý do)

---
