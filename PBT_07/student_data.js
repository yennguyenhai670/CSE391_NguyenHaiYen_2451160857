const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Khôi", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 10, physics: 9, cs: 10, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Khởi tạo các biến lưu trữ thống kê
let svGioi = 0, svKha = 0, svTb = 0, svYeu = 0;
let maxDiem = -1, minDiem = 11;
let svMax = "", svMin = "";
let tongMath = 0, tongPhysics = 0, tongCs = 0;
let tongDiemNam = 0, soNam = 0;
let tongDiemNu = 0, soNu = 0;

// In Header của bảng
console.log("| STT | Tên      | TB    | Xếp loại     |");
console.log("|-----|----------|-------|--------------|");

// Duyệt mảng bằng vòng lặp for cơ bản
for (let i = 0; i < students.length; i++) {
    const sv = students[i];
    
    // 1. Tính điểm trung bình (TB)
    const diemTb = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    
    // 2. Phân loại
    let xepLoai = "";
    if (diemTb >= 8.0) {
        xepLoai = "Giỏi";
        svGioi++;
    } else if (diemTb >= 6.5) {
        xepLoai = "Khá";
        svKha++;
    } else if (diemTb >= 5.0) {
        xepLoai = "Trung bình";
        svTb++;
    } else {
        xepLoai = "Yếu";
        svYeu++;
    }

    // 3. In dòng dữ liệu (Dùng padEnd để căn lề cho bảng đẹp mắt)
    const stt = String(i + 1).padEnd(3);
    const ten = sv.name.padEnd(8);
    const tbFormat = diemTb.toFixed(1).padEnd(5);
    const xlFormat = xepLoai.padEnd(12);
    console.log(`| ${stt} | ${ten} | ${tbFormat} | ${xlFormat} |`);

    // 5. Tìm SV điểm cao nhất và thấp nhất
    if (diemTb > maxDiem) {
        maxDiem = diemTb;
        svMax = sv.name;
    }
    if (diemTb < minDiem) {
        minDiem = diemTb;
        svMin = sv.name;
    }

    // 6. Cộng dồn điểm để tính TB môn
    tongMath += sv.math;
    tongPhysics += sv.physics;
    tongCs += sv.cs;

    // 7. Bonus: Cộng dồn điểm để tính TB theo giới tính
    if (sv.gender === "M") {
        tongDiemNam += diemTb;
        soNam++;
    } else {
        tongDiemNu += diemTb;
        soNu++;
    }
}

// In kết quả thống kê
const tongSV = students.length;
console.log("\n=== KẾT QUẢ THỐNG KÊ ===");

// 4. Đếm số SV mỗi xếp loại
console.log(`4. Số lượng SV: Giỏi (${svGioi}), Khá (${svKha}), TB (${svTb}), Yếu (${svYeu})`);

// 5. SV cao nhất và thấp nhất
console.log(`5. SV điểm cao nhất: ${svMax} (${maxDiem.toFixed(1)})`);
console.log(`   SV điểm thấp nhất: ${svMin} (${minDiem.toFixed(1)})`);

// 6. Tính điểm TB toàn lớp cho từng môn
const tbMath = (tongMath / tongSV).toFixed(1);
const tbPhysics = (tongPhysics / tongSV).toFixed(1);
const tbCs = (tongCs / tongSV).toFixed(1);
console.log(`6. Điểm TB môn toàn lớp: Math (${tbMath}), Physics (${tbPhysics}), CS (${tbCs})`);

// 7. Bonus: Tính điểm TB theo giới tính
const tbNam = (tongDiemNam / soNam).toFixed(1);
const tbNu = (tongDiemNu / soNu).toFixed(1);
console.log(`7. Điểm TB theo giới tính: Nam (${tbNam}) - Nữ (${tbNu})`);