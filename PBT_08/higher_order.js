// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
}

const process = pipe(
    x => x * 2,        // 5 * 2 = 10
    x => x + 10,       // 10 + 10 = 20
    x => x.toString(), // "20"
    x => "Kết quả: " + x
);
console.log("=== PIPE ===");
console.log(process(5)); 
// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== MEMOIZE ===");
console.log(expensiveCalc(1000000)); 
console.log(expensiveCalc(1000000));

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId); 
        timeoutId = setTimeout(() => {
            fn.apply(this, args); 
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

console.log("\n=== DEBOUNCE ===");
search("a");
search("ap");
search("app");
search("appl");
search("apple"); 
// 4. retry() — Thử lại nếu lỗi

async function retry(fn, maxAttempts = 3) {
    for (let i = 1; i <= maxAttempts; i++) {
        try {
            return await fn(); // Chờ kết quả của Promise
        } catch (error) {
            console.log(`Lỗi lần ${i}...`);
            if (i === maxAttempts) {
                throw error; 
            }
        }
    }
}

console.log("\n=== RETRY ===");
let attempts = 0;
const mockApiCall = async () => {
    attempts++;
    if (attempts < 3) throw new Error("Mất kết nối mạng");
    return "Call API thành công!";
};

retry(mockApiCall, 3)
    .then(result => console.log("Kết quả:", result))
    .catch(err => console.error("Lỗi cuối cùng:", err.message));