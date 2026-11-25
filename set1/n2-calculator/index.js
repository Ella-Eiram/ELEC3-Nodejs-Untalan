const os = require("os");

const operations = require("./operations");
const formatter = require("./formatter");

if (operation === "add") {
  // call operations.add(a, b), then print formatter.format("+", a, b, result)
} else if (operation === "subtract") {
  // ...
} else if (operation === "multiply") {
  // ...
} else if (operation === "divide") {
  // if b is 0, print an error message, otherwise calculate
} else if (operation === "average") {
  // ...
} else {
  console.log("Unknown operation: " + operation);
}

console.log("Run by: " + os.userInfo().username);
