// Name: Rhuella Marie Untalan
// Section: IV-BSIT A
// Activity: N3
// Date: November 26, 2026
// index.js - create, read, update, delete, and list text files using fs and path
// Usage: node index.js <command> [filename] ["content"]

const fs = require("fs");     // built-in File System module
const path = require("path"); // built-in path utilities

// Every file lives in the "files" folder next to this script.
// path.join builds the path correctly on any operating system.
const FILES_DIR = path.join(__dirname, "files");

// Create the "files" folder if it does not exist yet
if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR);
}

const [, , command, fileName, ...contentParts] = process.argv;
const content = contentParts.join(" ");

// Builds the full path of a file inside the files folder
function getFilePath(name) {
  return path.join(FILES_DIR, name);
}

function createFile(name, text) {
  const filePath = getFilePath(name);
  if (fs.existsSync(filePath)) {
    console.log(`Error: "${name}" already exists. Use update to add text.`);
    return;
  }
  fs.writeFileSync(filePath, text);
  console.log(`Created "${name}".`);
}

function readFile(name) {
  try {
    const data = fs.readFileSync(getFilePath(name), "utf8");
    console.log(`----- ${name} -----`);
    console.log(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`Error: "${name}" does not exist.`);
    } else {
      console.log(`Error reading "${name}": ${err.message}`);
    }
  }
}

function updateFile(name, text) {
  const filePath = getFilePath(name);
  if (!fs.existsSync(filePath)) {
    console.log(`Error: "${name}" does not exist. Use create first.`);
    return;
  }
  fs.appendFileSync(filePath, "\n" + text);
  console.log(`Appended text to "${name}".`);
}

function deleteFile(name) {
  try {
    fs.unlinkSync(getFilePath(name));
    console.log(`Deleted "${name}".`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`Error: "${name}" does not exist.`);
    } else {
      console.log(`Error deleting "${name}": ${err.message}`);
    }
  }
}

function listFiles() {
  const fileNames = fs.readdirSync(FILES_DIR);
  if (fileNames.length === 0) {
    console.log("The files folder is empty.");
    return;
  }
  console.log(`Files in ${FILES_DIR}:\n`);
  fileNames.forEach((name, index) => {
    const fullPath = getFilePath(name);
    console.log(`${index + 1}. ${path.basename(fullPath)}`);
    console.log(`   Full path: ${fullPath}`);
    console.log(`   Extension: ${path.extname(fullPath)}`);
    console.log(`   Contents:  ${fs.readFileSync(fullPath, "utf8")}\n`);
  });
}

// Commands that need a file name
const needsName = ["create", "read", "update", "delete"];
if (needsName.includes(command) && !fileName) {
  console.log(`Error: Please give a file name, e.g. node index.js ${command} notes.txt`);
  process.exit(1);
}

switch (command) {
  case "create":
    createFile(fileName, content);
    break;
  case "read":
    readFile(fileName);
    break;
  case "update":
    updateFile(fileName, content);
    break;
  case "delete":
    deleteFile(fileName);
    break;
  case "list":
    listFiles();
    break;
  default:
    console.log("Commands: create, read, update, delete, list");
    console.log('Example: node index.js create notes.txt "Hello"');
}