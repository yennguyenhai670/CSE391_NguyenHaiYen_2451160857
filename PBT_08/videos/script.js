function createCart() {
    let items = [];
    return {
        addItem(name, price) {
            items.push({ name, price });
        },
        removeItem(name) {
            items = items.filter(item => item.name !== name);
        },
        getTotal() {
            return items.reduce((sum, i) => sum + i.price, 0);
        },
        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng trống");
                return;
            }
            items.forEach(item => { 
                console.log(`${item.name}: ${item.price}đ`); 
            });
            console.log(`Tổng cộng: ${this.getTotal()}đ`);
        }
    };
}

const myCart = createCart();
myCart.addItem("Áo thun", 200000);
myCart.addItem("Quần jeans", 500000);
myCart.printCart();

console.log("--- Sau khi xóa Áo thun ---");
myCart.removeItem("Áo thun");
myCart.printCart();