// formatter.js - turns a result into a readable line like "12 + 8 = 20"
const symbols = { add: "+", subtract: "-", multiply: "×", divide: "÷" };

function formatResult(operation, numbers, result) {
  if (operation === "average") {
    return `average of ${numbers.join(", ")} = ${result}`;
  }
  return `${numbers[0]} ${symbols[operation]} ${numbers[1]} = ${result}`;
}

module.exports = { formatResult };