// Name: Juan P. Dela Cruz | Section: IV-BSIT A | Activity: N2 | Date: 2026-11-26
// operations.js - math functions for the calculator

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }

function divide(a, b) {
  // Throw an error instead of returning Infinity
  if (b === 0) throw new Error("Cannot divide by zero.");
  return a / b;
}

// Average accepts any count of numbers using rest parameters
function average(...nums) {
  const total = nums.reduce((sum, n) => sum + n, 0);
  return total / nums.length;
}

// Export the functions so other files can use them through require()
module.exports = { add, subtract, multiply, divide, average };