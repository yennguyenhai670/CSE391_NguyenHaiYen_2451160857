# PHIẾU BÀI TẬP 06
## TRACK A — BOOTSTRAP 5
### PHẦN A
#### Câu A1 — Grid System
```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```
| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 1 | 2 |4 |
| Box layout | dọc 4 dòng | lưới 2*2 | hàng ngang|
2. 
- col-md-6: Từ màn hình medium (≥ 768px), thẻ chiếm 6/12 cột (50% chiều rộng).
- Không cần col-sm-12: Vì Bootstrap là Mobile-First. col-12 đã áp dụng 100% chiều rộng từ 0px trở lên, mặc định bao gồm luôn cả sm (trừ khi bị breakpoint lớn hơn ghi đè).
#### Câu A2 — Utilities & Components
1. class `d-none d-md-block`
- Ẩn: Trên màn hình nhỏ < 768px (d-none).
- Hiện: Trên màn hình ≥ 768px (d-md-block).
2. 5 spacing utilities (margin/padding)
- mt-3: Margin trên (top).
- px-4: Padding trái & phải (x-axis).
- mb-auto: Margin dưới (bottom) tự động giãn.
- py-2: Padding trên & dưới (y-axis).
- m-0: Xóa toàn bộ margin (top, bottom, left, right bằng 0).
3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`.
- .container: Căn giữa, chiều rộng tối đa (max-width) nhảy bậc cố định theo các breakpoint.
- .container-fluid: Tràn viền, luôn chiếm 100% chiều rộng mọi màn hình.
- .container-md: Lai giữa 2 loại. Chiếm 100% dưới < 768px, từ ≥ 768px sẽ nhảy bậc giống .container.
`

### PHẦN C — PHÂN TÍCH

#### Câu C1 (10đ) — Tùy biến Bootstrap

1. Quy trình đổi màu $primary
- Công cụ: Node.js/npm và trình biên dịch SASS (hoặc dùng extension Live Sass Compiler trên VS Code).
- Quy trình: Tạo file custom.scss Khai báo biến $primary: #E63946; lên đầu  Viết dòng @import "bootstrap/scss/bootstrap"; ở dưới Biên dịch file này ra .css để dùng.

2. Tại sao KHÔNG nên override trực tiếp `.btn-primary { background: red; }` mà nên dùng SASS variables?

- Thay đổi biến SASS giúp đồng bộ toàn hệ thống. Nó tự động tính toán và cập nhật màu cho tất cả các thành phần liên quan (nền, chữ, viền, trạng thái hover/active của button, alert, badge...), không bị sót lỗi và code gọn gàng hơn việc phải đi đè CSS từng class một.


#### Câu C2 — So sánh
1. So sánh CSS Thuần vs Bootstrap (Navbar & Product Card)
- Số dòng CSS: CSS Thuần cần viết rất nhiều (hàng chục/trăm dòng). Bootstrap gần như bằng 0 (chỉ ghép các class có sẵn vào HTML).
- Thời gian phát triển: Bootstrap nhanh hơn vượt trội.
- Khả năng tùy biến: CSS Thuần tùy biến linh hoạt 100%. Bootstrap bị gò bó theo style mặc định, muốn đổi giao diện sâu phải tốn công ghi đè hoặc dùng SASS.
2. Khi nào NÊN và KHÔNG NÊN dùng Bootstrap?
- NÊN: Khi cần làm web nhanh (MVP, dự án chạy deadline), làm trang quản trị (Admin Dashboard), hoặc team cần một hệ thống class chuẩn mực dễ phối hợp.
- KHÔNG NÊN: Khi bản thiết kế (UI) quá phá cách và đặc thù, hoặc khi làm dự án cần tối ưu dung lượng siêu nhẹ (không muốn tải các file thừa của framework)
