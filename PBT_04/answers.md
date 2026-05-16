# PHIẾU BÀI TẬP 04
# **CSS LAYOUT — Positioning, Flexbox & Grid**

> **Tài liệu tham chiếu:** `tuan_2_css_core/12_css_positioning.md` + `tuan_3_css_advanced/13_creating_responsive_layouts.md`
>
---

## PHẦN A — KIỂM TRA ĐỌC HIỂU 

### Câu A1 — 5 Loại Positioning


| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | có | Normal flow (luồng chuẩn của tài liệu) | có | Layout mặc định của hầu hết các phần tử |
| `relative` | có | Vị trí gốc của chính nó (nếu nó là static) | có | Di chuyển phần tử nhẹ nhàng; làm điểm neo (container) cho absolute |
| `absolute` | không | Tổ tiên gần nhất có position khác static (nearest positioned ancestor) | có(theo cha) | Tooltip, dropdown menu, badge (ví dụ nhãn "HOT" ở góc ảnh) |
| `fixed` | không | Viewport (cửa sổ trình duyệt) | không | Cố định header/navbar trên cùng, nút back-to-top |
| `sticky` | có | Chuyển từ relative sang fixed dựa trên vị trí cuộn (tham chiếu viewport) | có(cho đến khi đạt điểm dừng) thì cố định | Sidebar bám dính khi cuộn, tiêu đề danh sách cố định (như danh bạ) |

**Câu hỏi thêm:** 
- `absolute` tham chiếu `body` khi nó không tìm thấy bất kỳ thẻ cha hay tổ tiên nào có thuộc tính position khác static
- `absolute` tham chiếu parent khi parent (hoặc tổ tiên của nó) được set position là relative, absolute, fixed, hoặc sticky
- "nearest positioned ancestor" Là phần tử tổ tiên gần nhất (khi đi ngược lên DOM tree) có thuộc tính position khác giá trị mặc định static

### Câu A2 — Flexbox vs Grid
```css
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = 1 hàng ngang, 4 cột bằng nhau. Mỗi item chiếm đúng 25% chiều rộng container.*/

/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = 3 hàng ngang, 2 cột. Vì 45% width + 2.5% margin trái + 2.5% margin phải = 50%. 2 items sẽ chiếm trọn 100% một dòng, các item sau tự động rớt xuống hàng mới (wrap). */

/* Trường hợp 3 */
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = 1 hàng ngang. Item 1 sát mép trái, Item 2 ở chính giữa, Item 3 sát mép phải (space-between). Cả 3 item được căn giữa theo chiều dọc */

/* Trường hợp 4 */
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = 1 hàng ngang, 3 cột. Cột trái cố định 200px, cột phải cố định 200px, cột giữa co giãn chiếm toàn bộ không gian còn lại (1fr) */

/* Trường hợp 5 */
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → Bố cục = 3 hàng. Hàng 1 có 3 items, hàng 2 có 3 items, hàng 3 có 1 item (nằm ở cột đầu tiên bên trái). Các cột rộng bằng nhau (1fr) */
```

---

## PHẦN C — SUY LUẬN

### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

Cho 5 tình huống layout thực tế. Với mỗi tình huống, trả lời: dùng **Flexbox**, **Grid**, hay **kết hợp cả hai**? Giải thích ngắn gọn tại sao.

1. Navigation bar ngang (logo + menu + buttons)
2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
3. Layout blog: main content + sidebar
4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

### Câu C2 (10đ) — Debug Flexbox

Layout sau bị lỗi. Mô tả lỗi và sửa.

**Lỗi 1:** Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

```css
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }
```

**Lỗi 2:** Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên

```css
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
```

**Lỗi 3:** Sidebar bị co lại khi content quá dài

```css
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }
```

Cho mỗi lỗi: Giải thích nguyên nhân → Viết code sửa → Chụp screenshot trước/sau.

---

