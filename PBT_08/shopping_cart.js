function createCart() {
    let items = [];
    let discount = 0;      
    let discountFixed = 0; 

    return {
        addItem(product, quantity = 1) {
            const index = items.findIndex(item => item.id === product.id);
            if (index !== -1) {
                items[index].quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId); 
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },
        
        getSubTotal() {
            return items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        getTotal() {
            const subTotal = this.getSubTotal();
            const total = subTotal - (subTotal * (discount / 100)) - discountFixed;
            return total > 0 ? total : 0; // Đảm bảo tổng tiền không bị âm
        },
        applyDiscount(code) {
            discount = 0;
            discountFixed = 0;

            if (code === "SALE10") discount = 10;
            else if (code === "SALE20") discount = 20;
            else if (code === "FREESHIP") discountFixed = 30000;
        },
        getItemCount() {
            return items.reduce((count, item) => count + item.quantity, 0);
        },
        clearCart() {
            items = [];
            discount = 0;
            discountFixed = 0;
        },

        // Tiện ích format tiền tệ
        formatMoney(amount) {
            return amount.toLocaleString("vi-VN");
        },

        // In giỏ hàng dạng bảng
        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng trống.");
                return;
            }

            console.log("┌─────────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm       │ SL │ Đơn giá      │ Tổng             │");
            
            items.forEach((item, index) => {
                const name = item.name.padEnd(14, ' ');
                const qty = item.quantity.toString().padStart(2, ' ');
                const price = this.formatMoney(item.price).padStart(12, ' ');
                const itemTotal = this.formatMoney(item.price * item.quantity).padStart(16, ' ');
                
                console.log(`│ ${index + 1} │ ${name} │ ${qty} │ ${price} │ ${itemTotal} │`);
            });
            
            console.log("├─────────────────────────────────────────────────────────────┤");
            if (discount > 0) {
                console.log(`│ Khuyến mãi:                                    Giảm ${discount}% │`);
            } else if (discountFixed > 0) {
                console.log(`│ Khuyến mãi:                              Giảm ${this.formatMoney(discountFixed)}đ │`);
            }

            const totalMoney = this.formatMoney(this.getTotal()).padStart(16, ' ');
            console.log(`│ Tổng cộng:                          ${totalMoney}đ │`);
            console.log("└─────────────────────────────────────────────────────────────┘\n");
        }
    };
}


//TEST
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();
cart.applyDiscount("SALE10");
cart.printCart();
console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2