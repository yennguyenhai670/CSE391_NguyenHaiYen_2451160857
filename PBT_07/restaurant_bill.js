/**
 * Chương trình tính toán và in hóa đơn nhà hàng
 * @param {Array} danhSach - Danh sách món ăn [{ ten, soLuong, gia }]
 * @param {boolean} laThuTu - Có phải thứ Tư (Wednesday) không
 * @param {boolean} coTip - Có thêm 5% tip không
 */
function inHoaDon(danhSach, laThuTu = false, coTip = false) {
    // 1. Tính tổng tiền món ăn
    let tongTien = 0;
    const danhSachIn = danhSach.map((mon, index) => {
        const thanhTien = mon.gia * mon.soLuong;
        tongTien += thanhTien;
        
        // Căn lề cho từng cột: Tên (16) | Số lượng (6) | Đơn giá (8) | Thành tiền
        const cotTen = `${index + 1}. ${mon.ten}`.padEnd(16);
        const cotSL = `x${mon.soLuong}`.padEnd(6);
        const cotGia = `@${mon.gia / 1000}k`.padEnd(8);
        const cotTong = `= ${thanhTien / 1000}k`;
        
        return (cotTen + cotSL + cotGia + cotTong).padEnd(36);
    });

    // 2. Tính toán phần trăm giảm giá
    let phanTramGiam = 0;
    if (tongTien > 1000000) {
        phanTramGiam = 15;
    } else if (tongTien > 500000) {
        phanTramGiam = 10;
    }
    
    // Cộng dồn 5% nếu là Wednesday
    if (laThuTu) phanTramGiam += 5;

    // 3. Tính các chi phí chi tiết
    const tienGiam = (tongTien * phanTramGiam) / 100;
    const tienSauGiam = tongTien - tienGiam;
    
    const vat = tienSauGiam * 0.08; // VAT 8%
    const tip = coTip ? (tienSauGiam * 0.05) : 0; // Tip 5%
    
    const thanhToan = tienSauGiam + vat + tip;

    // 4. Utility format tiền tệ & vẽ khung ASCII
    const formatTien = (so) => so.toLocaleString('vi-VN') + 'đ';
    const veDong = (trai, phai) => {
        const khoangTrang = 36 - trai.length - phai.length;
        return `║ ${trai}${" ".repeat(Math.max(0, khoangTrang))}${phai} ║`;
    };

    const vienTren = `╔${"═".repeat(38)}╗`;
    const vienGiua = `╠${"═".repeat(38)}╣`;
    const vienDuoi = `╚${"═".repeat(38)}╝`;

    // 5. In kết quả
    console.log(vienTren);
    console.log(`║        HÓA ĐƠN NHÀ HÀNG            ║`);
    console.log(vienGiua);
    danhSachIn.forEach(dong => console.log(`║ ${dong} ║`));
    console.log(vienGiua);
    console.log(veDong(`Tổng cộng:`, formatTien(tongTien)));
    console.log(veDong(`Giảm giá (${phanTramGiam}%):`, formatTien(tienGiam)));
    console.log(veDong(`VAT (8%):`, formatTien(vat)));
    console.log(veDong(`Tip (5%):`, formatTien(tip)));
    console.log(vienGiua);
    console.log(veDong(`THANH TOÁN:`, formatTien(thanhToan)));
    console.log(vienDuoi);
}


// TEST CHẠY THỬ VỚI DATA TỪ ĐỀ BÀI
const order = [
    { ten: "Phở bò", soLuong: 2, gia: 65000 },
    { ten: "Trà đá", soLuong: 3, gia: 5000 },
    { ten: "Bún chả", soLuong: 1, gia: 55000 }
];

// Chạy hàm: Thứ 4 = false, Có Tip = true
inHoaDon(order, false, true);