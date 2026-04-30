## PHẦN A — KIỂM TRA ĐỌC HIỂU 

### Câu A1 — HTTP & Browser
**Nguồn tham chiếu:** `01_introduction_html_universe.md` - Mục `1.1. Kiến trúc Client-Server` và `1.3. Browser Rendering`.

1. Khi gõ `https://shopee.vn`:
- **DNS Lookup:** Trình duyệt tìm kiếm địa chỉ IP tương ứng với tên miền `shopee.vn`.
- **Establish Connection (TCP/TLS Handshake):** Thiết lập kết nối an toàn giữa máy tính của bạn và máy chủ Shopee.
- **HTTP Request:** Trình duyệt gửi yêu cầu (thường là phương thức GET) để lấy dữ liệu trang web.
- **Server Response:** Máy chủ Shopee xử lý và gửi lại các file (HTML, CSS, JS) cho trình duyệt.
- **Browser Rendering:** Trình duyệt đọc code (Parse), dựng khung xương (DOM), nạp phong cách (CSS) và hiển thị giao diện lên màn hình.

2. Trong DevTools của Chrome, tab **Network** cho thấy thông tin gì? 
- **Status Code của request đầu tiên:** 200 (Thành công).
- **Tổng thời gian load trang:** 31.34 s.
- **Request trả về file CSS:** File `bundle.9b0f374b...` có Type là `stylesheet`.

### Câu A2 — Semantic HTML
**Nguồn tham chiếu**: File Chương 04_visible_part_html.md - Mục:Semantic HTML5 và phần Bản đồ Semantic Elements.

1. Tại sao trang web dưới đây bị Google đánh giá SEO thấp? Liệt kê **ít nhất 4 lỗi semantic** và sửa lại.
- Trang web mắc lỗi "Div Soup" (lạm dụng thẻ `<div>`).Việc sử dụng các thẻ phi ngữ nghĩa khiến Google không thể phân tích được cấu trúc trang web: không biết đâu là phần đầu (header), nội dung chính (main) hay thông tin sản phẩm (article). Điều này làm giảm khả năng lập chỉ mục (index) nội dung chính xác, dẫn đến xếp hạng SEO thấp.
2. Liệt kê 4 lỗi Semantic và cách sửa:

| Lỗi hiện tại | Thẻ Semantic thay thế | Lý do |
| :--- | :--- | :--- |
| `<div class="header">` | `<header>` | Xác định đây là phần chứa Logo và menu chính. |
| `<div class="menu">` | `<nav>` | Đánh dấu đây là khu vực điều hướng (Navigation). |
| `<div class="main">` | `<main>` | Chỉ định vùng chứa nội dung chính của trang (duy nhất 1 thẻ mỗi trang). |
| `<div class="product">` | `<article>` | Dùng cho một nội dung độc lập như một sản phẩm cụ thể. |

3. Sửa code
```html
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
```

### Câu A3 — Block vs Inline

**Nguồn tham chiếu**: File Chương 04_visible_part_html.md - Mục:Block vs Inline — Hai loại element cơ bản

Không chạy code, hãy **vẽ tay** (hoặc mô tả bằng text art) kết quả hiển thị của đoạn HTML sau. Giải thích tại sao.
1. Mô tả kết quả hiển thị bằng Text Art

```text
+--------------------------------------------------+
| Hộp 1                                            |
+--------------------------------------------------+
Text A Text B
+--------------------------------------------------+
| Hộp 2                                            |
+--------------------------------------------------+
Text C **Text D**
+--------------------------------------------------+
| Hộp 3                                            |
+--------------------------------------------------+
```
3.  Giải thích chi tiết 
- `<div>Hộp 1</div>`:Vì `<div>` là phần tử Block, nó sẽ tạo ra một dòng mới và chiếm toàn bộ chiều ngang màn hình. Chữ "Hộp 1" nằm bên trong dòng này,sau khi kết thúc thẻ này, trình duyệt sẽ tự động xuống dòng
- `<span>Text A</span><span>Text B</span>`:Cả `<span` đều là Inline. Sau khi dòng trên kết thúc, dòng này bắt đầu với "Text A"."Text B" thấy "Text A" là inline nên nó sẽ xếp ngay cạnh "Text A" trên cùng 1 dòng.
- `<div>Hộp 2</div>`:Trình duyệt gặp lại phần tử Block. Nó bắt buộc phải ngắt dòng hiện tại chứa Text A và Text B, nhảy xuống một dòng mới hoàn toàn để hiển thị "Hộp 2" trên toàn bộ chiều ngang.
- `<span>Text C</span><strong>Text D</strong>`: Tương tự bước 2, hai phần tử Inline này nằm cùng nhau trên một dòng mới. Riêng chữ "Text D" sẽ được in đậm do nằm trong thẻ `<strong>`.
- `<div>Hộp 3</div>`: Cuối cùng, một phần tử Block lại ngắt dòng hiện tại và đẩy "Hộp 3" xuống một dòng riêng biệt, chiếm trọn chiều ngang màn hình.
```html
<div>Hộp 1</div>
<span>Text A</span>
<span>Text B</span>
<div>Hộp 2</div>
<span>Text C</span>
<strong>Text D</strong>
<div>Hộp 3</div>
```

### Câu A4 — Table

**Nguồn tham chiếu**: File 05_tables_hyperlinks.md - Mục:TABLE-Bảng dữ liệu
Đọc chương 05. Giải thích sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`. Tại sao KHÔNG NÊN dùng table để tạo layout trang web? (Ghi rõ ít nhất 3 lý do)

**1. Sự khác nhau giữa `<thead>`, `<tbody>`, và `<tfoot>`**
- **`<thead>` (Tiêu đề bảng):** Nhóm các hàng chứa thông tin tiêu đề của các cột (thường dùng kết hợp với thẻ `<th>`).
- **`<tbody>` (Thân bảng):** Nhóm các hàng chứa nội dung, dữ liệu chính của bảng (thường dùng kết hợp với thẻ `<td>`).
- **`<tfoot>` (Chân bảng):** Nhóm các hàng chứa thông tin tổng kết, tính toán hoặc chú thích cho dữ liệu ở trên (ví dụ: dòng tổng tiền, tổng số lượng).

**2. 3 lý do KHÔNG NÊN dùng table để tạo layout trang web:**
- **Phá vỡ Ngữ nghĩa (Semantic) & Giảm khả năng tiếp cận (Accessibility):** Thẻ `<table>` sinh ra với mục đích duy nhất là hiển thị dữ liệu dạng bảng (Tabular Data). Dùng nó làm layout sẽ khiến các trình đọc màn hình (Screen Reader) của người khiếm thị đọc sai cấu trúc trang, gây khó hiểu.
- **Cứng nhắc, cực kỳ khó Responsive:** Table tự động ép kích thước theo dữ liệu bên trong. Khi hiển thị trên màn hình nhỏ (điện thoại), layout bằng table rất dễ bị vỡ, tràn viền ngang và khó chuyển đổi linh hoạt (Ngày nay, CSS Flexbox và Grid làm việc này tốt hơn rất nhiều).
- **Code cồng kềnh (Code Bloat) & Khó bảo trì:** Để chia các khu vực phức tạp bằng table, lập trình viên phải lồng vô số thẻ `<table>`, `<tr>`, `<td>` vào nhau. Điều này khiến file HTML trở nên khổng lồ, rối rắm, tải chậm và như "mò kim đáy bể" khi cần sửa code.

---
## PHẦN C — SUY LUẬN 
### Câu C1 — Thiết kế cấu trúc
Bạn được giao thiết kế cấu trúc HTML cho trang **chi tiết sản phẩm** (giống trang sản phẩm Shopee/Tiki). Trang bao gồm:
- Header + Navigation
- Breadcrumb (Trang chủ > Điện thoại > iPhone 16)
- Khu vực ảnh sản phẩm (5 ảnh)
- Thông tin sản phẩm (tên, giá, đánh giá sao, mô tả)
- Bảng thông số kỹ thuật
- Khu vực đánh giá/bình luận
- Sidebar: Sản phẩm tương tự
- Footer

**Yêu cầu:** Viết **chỉ phần cấu trúc HTML** (không cần nội dung thật, chỉ cần đúng thẻ và nesting). Mỗi thẻ phải có comment giải thích tại sao bạn chọn thẻ đó.

**Bài làm**

```html
<body>
    <header> 
        <!--Phần đầu trang-->
        <nav aria-label="Main navigation"><!--Khu vực điều hướng-->
            <ul> <!--Danh sách không thứ tự-->
                <li><a href="/">Trang chủ</a></li><!--Mục danh sách,siêu liên kết-->
                <li><a href="/danh-muc">Danh mục</a></li>
            </ul>
        </nav>
    </header>

    <main><!--Nội dung chính-->
        <nav aria-label="breadcrumb"><!--Khu vực điều hướng biết bản thân đang ở đâu-->
            <ol><!--Có thứ tự từ lớn xuống nhỏ-->
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/dien-thoai">Điện thoại</a></li>
                <li aria-current="page">iPhone 16</li>
            </ol>
        </nav>
        <!--Khu vực về sản phẩm-->
        <article class="product-details">
            
            <section class="product-gallery">
                <figure>
                    <img src="iphone16-main.jpg" alt="Ảnh chính iPhone 16">
                </figure>
                <ul>
                    <li><img src="thumb1.jpg" alt="Góc trái"></li>
                    <li><img src="thumb2.jpg" alt="Góc phải"></li>
                    <li><img src="thumb3.jpg" alt="Mặt lưng"></li>
                    <li><img src="thumb4.jpg" alt="Phụ kiện"></li>
                </ul>
            </section>

            <section class="product-info">
                <h1>iPhone 16 128GB</h1>
                <p class="price">25.990.000đ</p>
                <p class="rating">⭐⭐⭐⭐⭐ (120 đánh giá)</p>
                <p class="description">Mô tả chi tiết về tính năng sản phẩm...</p>
            </section>

            <section class="product-specs">
                <h2>Thông số kỹ thuật</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Màn hình</th>
                            <td>6.1 inch, Super Retina XDR</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section class="product-reviews">
                <h2>Đánh giá từ khách hàng</h2>
                <article class="review-item">
                    <h3>Nguyễn Văn A</h3>
                    <p>Sản phẩm rất tốt, giao hàng nhanh!</p>
                </article>
            </section>
        </article>
        <!--Khu vực nội dung phụ trợ-->
        <aside class="related-products">
            <h2>Sản phẩm tương tự</h2>
            <ul>
                <li><a href="#">iPhone 15</a></li>
                <li><a href="#">iPhone 16 Pro</a></li>
            </ul>
        </aside>
    </main>
    <!--Chân Trang-->
    <footer>
        <p>&copy; 2026 Tiki / Shopee Clone.</p>
    </footer>
</body>
```

### Câu C2 — So sánh & Tranh luận

Một đồng nghiệp nói: *"Dùng `<div>` cho mọi thứ rồi thêm class là được, không cần semantic HTML. Tốn thời gian học thêm thẻ mới."*

Viết 1 đoạn phản biện (200-300 từ), phải bao gồm:
- Ít nhất 2 lý do kỹ thuật (SEO, Accessibility)
- 1 ví dụ cụ thể chứng minh semantic HTML giúp ích
- 1 trường hợp thực tế mà `<div>` vẫn phù hợp

**Bài làm**

Quan điểm "chỉ cần dùng `<div>` cho mọi thứ và thêm class" là một tư duy lập trình đã lỗi thời và gây ảnh hưởng xấu đến chất lượng của một trang web chuyên nghiệp. Việc sử dụng Semantic HTML (HTML ngữ nghĩa) là tiêu chuẩn bắt buộc hiện nay với hai lý do kỹ thuật cốt lõi:

Thứ nhất, về mặt SEO (Tối ưu hóa công cụ tìm kiếm). Các bot của Google không có mắt để nhìn CSS đẹp hay xấu; chúng chỉ đọc mã nguồn HTML để phân tích cấu trúc. Khi bạn dùng thẻ `<article> hay <main>`, bot ngay lập tức hiểu đó là nội dung quan trọng nhất để thu thập và xếp hạng. Nếu toàn bộ trang chỉ là `<div>`, bot sẽ coi đó là một mớ dữ liệu hỗn độn, không có trọng tâm, làm giảm đáng kể thứ hạng tìm kiếm.

Thứ hai, về Accessibility (Khả năng tiếp cận). Những người khiếm thị phụ thuộc hoàn toàn vào Screen Reader (phần mềm đọc màn hình) để lướt web. Ví dụ cụ thể: Nếu bạn dùng thẻ `<nav>` cho menu điều hướng, trình đọc màn hình sẽ thông báo đây là menu và cho phép người dùng bấm phím tắt để nhảy thẳng qua nó nhằm đi tới nội dung chính. Nếu bạn dùng `<div class="menu">`, phần mềm sẽ coi đó là văn bản thường, buộc người khiếm thị phải nghe đọc từng mục link rất mệt mỏi. Tương tự, nếu dùng `<div class="btn">` thay vì `<button>`, người dùng bàn phím sẽ không thể dùng phím Enter hoặc Space để click vào nút đó.

Tuy nhiên, thẻ `<div>` vẫn cực kỳ phù hợp trong một trường hợp thực tế: Đó là khi bạn cần một khối chứa (container/wrapper) đơn thuần chỉ để phục vụ việc chia bố cục (layout) hoặc tạo kiểu (styling) bằng CSS Flexbox/Grid. Những vùng chứa này không mang lại bất kỳ ý nghĩa ngữ nghĩa nào cho nội dung tài liệu, nên dùng `<div>` là sự lựa chọn chuẩn xác nhất.

---
## Phần B: Thực hành

### Câu B3:

- Lỗi 1: Dòng 1 - thiết html ở sau `<!DOCTYPE>` - Thêm html vào sau `<!DOCTYPE>` thành `<!DOCTYPE html>`.
- Lỗi 2: Dòng 4 - thẻ `<title>` chưa đóng - thêm `</title>` sau "Trang web".
- Lỗi 3: Dòng 8 - thẻ `<h1>` chưa đóng đúng cách - sửa `<h1>` sau chữ "ShopTLU" thành `</h1>`.
- Lỗi 4: Dòng 12 - thẻ `<a>` chưa đóng đúng cách - sửa `<a>` sau chữ "Trang chủ" thành `</a>`.
- Lỗi 5: Dòng 22 - thẻ `<b>` đóng sai thứ tự - đóng `</b>` ngay trước thẻ `</p>`.
- Lỗi 6: Dòng 20 - thiết alt - thêm alt vào sau src ảnh.
- Lỗi 7: Dòng 45 - Thẻ `<p>` chưa đóng trong `<footer>`- Thêm `</p>` vào sau "Copyright 2026".
- Lỗi 8: Dòng 40 - Sử dụng 2 thẻ `<main>` trong 1 trang - Sửa thẻ `<main>` thứ 2 thành thẻ `<aside>`.
- Lỗi 9: Dòng 5 - Sai charset - sửa thành `<meta charset="UTF-8">`.
- Lỗi 10: Chưa đóng thẻ `<html>` - Thêm `</html>` sau thẻ `</body>`

### Câu B4:  
**Trang web đã chọn:** thegioididong.com

## 1. Phân tích thẻ Semantic HTML5
![Ảnh chụp tab Elements cho thẻ Semantic](https://sf-static.upanhlaylink.com/img/image_20260425d81206c0a25029311266abed9b237084.jpg)
* **3 thẻ semantic HTML5 mà trang sử dụng:**
  1. Thẻ `<header>`: Nằm ở phần trên cùng của bộ khung HTML (class="header v2024"), bao bọc khu vực logo, thanh tìm kiếm và menu điều hướng chính.
  2. Thẻ `<footer>`: Nằm ở dưới cùng của mã nguồn (class="footer v2024"), chứa các liên kết hỗ trợ, thông tin công ty và bản quyền.
  3. Thẻ `<h1>`: Được sử dụng ở thẻ `<h1 class="sc-only">` nhằm mục đích tối ưu hóa SEO (khai báo tiêu đề chính của trang) nhưng được ẩn đi đối với người dùng (screen-reader only).

* **Thẻ dùng KHÔNG đúng semantic:**
  1. Lạm dụng thẻ `<div>` (Divitis): Trang sử dụng quá nhiều thẻ `<div>` để tạo các hộp thoại, popup (ví dụ: `<div class="locationbox__popup">`) thay vì sử dụng thẻ `<dialog>` chuẩn của HTML5.
  2. Thẻ `<i>`: Trang web (và nhiều thư viện bên thứ 3 nhúng vào) thường dùng thẻ `<i>` để hiển thị các icon (biểu tượng) thay vì dùng đúng ngữ nghĩa của nó là để in nghiêng văn bản.

## 2. Phân tích thẻ `<table>`
![Ảnh chụp tab Elements khu vực thông số kỹ thuật](https://sf-static.upanhlaylink.com/img/image_202604250b72c8dcdabbb3d894dab455ff40658c.jpg)
* **Phát hiện thực tế:** Qua việc sử dụng DevTools inspect phần "Cấu hình & Bộ nhớ", em phát hiện ra trang web Thế Giới Di Động **không sử dụng** thẻ `<table>` truyền thống để hiển thị bảng thông số kỹ thuật.
* Thay vì dùng `<table>`, `<tr>`, `<td>`, lập trình viên đã sử dụng thẻ danh sách không thứ tự `<ul class="text-specifi">` và các thẻ `<li>` chứa dữ liệu bên trong. Sau đó, họ sử dụng CSS để dàn trang (layout) các thẻ `<li>` này thành dạng lưới (grid) trông giống như một bảng thực thụ.
* Đây là một kỹ thuật dàn trang rất phổ biến ở các website hiện đại để dễ dàng tùy biến giao diện trên thiết bị di động (Responsive Web Design) hơn so với thẻ table truyền thống.

## 3. Phân tích thẻ `<form>`
![Ảnh chụp tab Elements cho thẻ Form](https://sf-static.upanhlaylink.com/img/image_20260425c1da88f5d4e00905a667639ebac9c60e.jpg)
* **Vị trí form:** Bao bọc ô nhập liệu tìm kiếm, nằm bên trong phần header của trang web.
* **Thuộc tính của form:**
  * `action="/tim-kiem"`: Khi người dùng tìm kiếm, dữ liệu sẽ được gửi đến đường dẫn `/tim-kiem` để xử lý và trả về kết quả.
  * `method`: Thẻ form này không khai báo tường minh thuộc tính method. Theo chuẩn HTML, trình duyệt sẽ mặc định hiểu method là `GET`. Ngoài ra, form có sử dụng sự kiện `onsubmit="return suggestSearch(event);"` để xử lý bằng JavaScript trước khi gửi đi.
* **Input types nào được dùng?**
  * `<input type="text">`: Được sử dụng làm ô nhập từ khóa tìm kiếm (có `name="key"`).
  * `<button type="submit">`: Nút bấm để thực thi lệnh gửi form tìm kiếm.
