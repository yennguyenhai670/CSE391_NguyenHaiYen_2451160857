// Version 1: Classic FizzBuzz
function classicFizzBuzz() {
    console.log("=== Version 1: Classic ===");
    for (let i = 1; i <= 100; i++) {
        let output = "";
        if (i % 3 === 0) output += "Fizz";
        if (i % 5 === 0) output += "Buzz";
        console.log(output || i);
    }
}
// Version 2: Custom FizzBuzz
function customFizzBuzz(n, rules) {
    console.log(`\n=== Version 2: Custom (1 đến ${n}) ===`);
    for (let i = 1; i <= n; i++) {
        let output = "";
        
        for (const rule of rules) {
            if (i % rule.divisor === 0) {
                output += rule.word;
            }
        }
        console.log(output || i);
    }
}
// Test Cases
//set n = 105 
customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);
