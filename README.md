# ELEC 3 – Node.js Self-Paced Learning Assignment

**Name:** Rhuella Marie Untalan
**Section:** IV-BSIT A
**Course:** ELEC 3 – Node.js
**Instructor:** Carl Gustaf Patrik B. Ferrer

## Activities

### Set 1

| Activity | Description | Folder |
|---|---|---|
| N1 | Project setup with npm, package.json, express and nodemon | [set1/n1-setup](set1/n1-setup) |
| N2 | Modular command-line calculator using require and module.exports | [set1/n2-calculator](set1/n2-calculator) |
| N3 | File manager using the fs and path modules | [set1/n3-file-manager](set1/n3-file-manager) |

## How to run

### N1: Project Setup
```bash
cd set1/n1-setup
npm install
npm start
```

### N2: Modular Calculator
```bash
cd set1/n2-calculator
node index.js add 12 8
```
Operations: `add`, `subtract`, `multiply`, `divide`, `average`

### N3: File Manager
```bash
cd set1/n3-file-manager
node index.js create notes.txt "Hello"
node index.js read notes.txt
node index.js update notes.txt " more text"
node index.js delete notes.txt
node index.js list
```

## Screenshots

### N1
![N1 npm start](set1/n1-setup/screenshots/n1-npm-start.png)

### N2
![N2 calculator output](set1/n2-calculator/screenshots/n2-output.png)

### N3
![N3 file manager output](set1/n3-file-manager/screenshots/n3-list.png)