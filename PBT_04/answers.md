# PHIẾU BÀI TẬP 04
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
1. Navigation bar ngang (logo + menu + buttons)
- Chọn: Flexbox
- Vì:Thanh điều hướng là một layout 1 chiều (1D) nằm ngang. Flexbox sinh ra để giải quyết bài toán này. Bạn có thể dễ dàng căn giữa các phần tử theo chiều dọc (align-items: center) và phân bổ khoảng trống linh hoạt (ví dụ: dùng justify-content: space-between để đẩy logo sang trái và cụm menu/button sang phải)
2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
- Chọn: Grid
- Vì:Lưới ảnh là layout 2 chiều (2D) yêu cầu sự kiểm soát chặt chẽ trên cả hàng và cột. Sử dụng grid-template-columns: repeat(3, 1fr) sẽ đảm bảo luôn có chính xác 3 cột bằng nhau, các ảnh tự động tràn xuống hàng dưới một cách ngay ngắn bất kể số lượng. Nếu dùng Flexbox (flex-wrap), hàng cuối cùng có thể bị thò thụt hoặc giãn sai kích thước nếu thiếu phần tử
3. Layout blog: main content + sidebar
- Chọn:Grid và Flexbox
- Đối với khung ngoài (Layout chính): Dùng Grid là tốt nhất vì đây là macro-layout,có thể dễ dàng chia tỷ lệ (ví dụ: grid-template-columns: 3fr 1fr) và điều khiển khoảng cách bằng gap
- Đối với nội dung bên trong: Dùng Flexbox để sắp xếp các chi tiết nhỏ lẻ bên trong Main Content (như avatar tác giả cạnh tên) hoặc Sidebar (danh sách tag, bài viết mới)
4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
- Chọn: Grid
- Vì:Footer phân cột là bài toán cấu trúc mảng. Dùng Grid với grid-template-columns: repeat(4, 1fr) giúp 4 cột chia tỷ lệ đều tăm tắp ngay lập tức. Hơn nữa, Grid cực kỳ dễ để xử lý Responsive: khi xuống màn hình tablet, bạn chỉ cần đổi thành repeat(2, 1fr) (2 cột 2 hàng) và mobile là 1fr (1 cột) mà không lo các cột bị lệch nhau
5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
- Chọn: Flexbox
- Đây là tình huống Flexbox thể hiện sức mạnh tốt nhất. Mình sẽ cho thẻ bọc ngoài của card là flex-direction: column và set chiều cao bằng nhau (height: 100%). Bí quyết là ở phần text ở giữa, mình chỉ cần ném cho nó thuộc tính flex-grow: 1. Nó sẽ tự động chiếm hết mọi không gian trống thừa ra, từ đó ép cái nút "Mua ngay" dính chặt xuống dưới đáy card

### Câu C2 (10đ) — Debug Flexbox

**Lỗi 1:** Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
- Nguyên nhân: Khi bọc .card-container bằng Flexbox, theo mặc định align-items: stretch đã giúp các thẻ .card có chiều cao bằng nhau rồi. Tuy nhiên, nội dung bên trong (ảnh, text) dài ngắn khác nhau. Vì .card đang là block thông thường, các phần tử cứ thế xếp chồng lên nhau. Nội dung ít thì nút "Mua" nằm tít trên cao, nội dung nhiều thì nút bị đẩy xuống dưới, nhìn tổng thể hàng nút lởm chởm.
- Sửa: Biến chính bản thân thẻ .card thành một Flexbox dọc. Sau đó, dùng trick margin-top: auto cho cái nút. Thuộc tính này sẽ hút hết toàn bộ khoảng trống thừa bên trên nó, ép cái nút dính chặt xuống mặt đáy của card.

```css
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }

/* Sửa code lỗi 1*/
.card-container { display: flex; flex-wrap: wrap; }
.card { 
    width: 30%; 
    margin: 1.5%; 
    display: flex;             
    flex-direction: column;    
}
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { 
    padding: 10px; 
    margin-top: auto;          
}
```

**Lỗi 2:** Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên

- Nguyên nhân: Khai báo display: flex ở .hero mới chỉ đánh thức Flexbox, mặc định nó sẽ xếp phần tử từ góc trên cùng bên trái. Còn cái text-align: center ở .hero-content là vô dụng trong việc căn chỉnh layout của khối, nó chỉ có tác dụng căn giữa đoạn văn bản (chữ) ở bên trong khối đó thôi. Không có lệnh căn trục, khối .hero-content vẫn dính chặt ở top-left
- Sửa:Để bộ đôi quyền lực của Flexbox vào thẳng thẻ cha .hero: justify-content để căn giữa trục ngang và align-items để căn giữa trục dọc

```css
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
/*Sửa code lỗi 2*/
.hero {
        height: 100vh;
        display: flex;
        justify-content: center; /* Căn giữa theo chiều ngang */
        align-items: center;     /* Căn giữa theo chiều dọc */
    }
    .hero-content {
        text-align: center; 
    }
```

**Lỗi 3:** Sidebar bị co lại khi content quá dài
- Nguyên nhân:Flexbox có một thuộc tính ngầm định cực kỳ nhiệt tình là `flex-shrink: 1` áp dụng cho mọi flex-item. Ý nghĩa của nó là: "Nếu khung cha thiếu chỗ, hãy tự bóp nhỏ mình lại để nhường nhịn". Khi phần `.content` có quá nhiều text hoặc hình ảnh dài ngoẵng, nó sẽ ép cái `.sidebar` phải nhường chỗ. Kết quả là cái lệnh `width: 250px` kia bị Flexbox tước quyền lực, sidebar bị teo rúm lại
- Sửa: Đặt `flex-shrink: 0` cho `.sidebar` để ra lệnh cho Flexbox: "Dù trời có sập, phần nội dung có dài vô tận thì vẫn phải giữ đúng chiều rộng 250px cho tôi, cấm co lại".


```css
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }

/*Sửa code lỗi 3*/
.layout { display: flex; }
.sidebar { 
        width: 250px; 
        flex-shrink: 0; 
    }
.content { 
        flex: 1; 
    }

```

