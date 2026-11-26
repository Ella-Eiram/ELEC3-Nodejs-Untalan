// Rhuella Marie Untalan
// IV-BSIT A
// N2
// NOVEMBER 23,2026


// index.js - entry point: node index.js <operation> <numbers...>
const os = require("os");                     // built-in module
const operations = require("./operations");   // custom module
const { formatResult } = require("./formatter");

// process.argv = [node path, script path, operation, num1, num2, ...]
const [, , operation, ...rawNumbers] = process.argv;
const numbers = rawNumbers.map(Number);

console.log(`Calculator run by ${os.userInfo().username} on ${os.hostname()}`);

// Unknown or missing operation
if (!operation || !operations[operation]) {
  console.log(`Error: Unknown operation "${operation}". Use add, subtract, multiply, divide, or average.`);
  process.exit(1);
}

// Non-numeric or missing inputs
if (numbers.length < 2 || numbers.some(isNaN)) {
  console.log("Error: Please enter at least two valid numbers.");
  process.exit(1);
}

try {
  const result = operations[operation](...numbers);
  console.log(formatResult(operation, numbers, result));
} catch (err) {
  console.log(`Error: ${err.message}`);   // e.g. division by zero
}

// N2: add operations and formatter modules, then N2: handle division by zero and unknown operations