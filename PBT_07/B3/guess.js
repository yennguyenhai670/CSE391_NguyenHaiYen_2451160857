function playGame() {
    
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    
    const maxAttempts = 7;
    let attempts = 0;
    const guessedHistory = []; 

    alert("Chào mừng đến với Mini Game: Đoán số từ 1 đến 100!\nBạn có tối đa 7 lần đoán.");


    while (attempts < maxAttempts) {
        let input = prompt(`Lần đoán thứ ${attempts + 1}/${maxAttempts}.\nVui lòng nhập một số từ 1 đến 100:`);
        
        
        if (input === null) {
            alert("Bạn đã thoát game!");
            return; 
        }

        
        let guess = Number(input);

        
        if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
            alert("Không hợp lệ! Chỉ chấp nhận số nguyên từ 1 đến 100.");
            continue; 
        }

        if (guessedHistory.includes(guess)) {
            alert("Bạn đã đoán số này rồi! Vui lòng chọn số khác.");
            continue; 
        }

        guessedHistory.push(guess);
        attempts++;

        if (guess === targetNumber) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
            return; 
        } else if (guess < targetNumber) {
            alert("Cao hơn! (Số bí mật lớn hơn số bạn đoán)");
        } else {
            alert("Thấp hơn! (Số bí mật nhỏ hơn số bạn đoán)");
        }
    }
    alert(`Hết lượt! Bạn đã thua.\nĐáp án chính xác là: ${targetNumber}`);
}

playGame();