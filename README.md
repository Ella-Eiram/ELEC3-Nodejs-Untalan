# ELEC 3 – Node.js

**Name:** Rhuella Marie Untalan
**Section:** IV-BSIT A
**Course:** ELEC 3 – Node.js
**Instructor:** Carl Gustaf Patrik B. Ferrer
**Reference:** Node.js Crash Course – Traversy Media

This repository contains my outputs for the ELEC 3 Self-Paced Learning Assignment (lessons from November 9–20, 2026).

---

## Activities

### Set 1 (Nov 23–29, 2026)

| Code | Activity | Description | Folder |
|------|----------|-------------|--------|
| N1 | Project Setup and Package Management | Initializes a Node.js project with `npm init`, installs a regular dependency (`dayjs`) and a dev dependency (`nodemon`), and runs it with `npm start`. | [set1/n1-setup](set1/n1-setup/) |
| N2 | Modular Calculator | Command-line calculator split into custom modules (`operations.js`, `formatter.js`) using `module.exports` and `require()`, with error handling for division by zero and unknown operations. | [set1/n2-calculator](set1/n2-calculator/) |
| N3 | File Manager with fs and path | Creates, reads, updates, deletes, and lists text files in a `files` folder using the `fs` and `path` modules. | [set1/n3-file-manager](set1/n3-file-manager/) |

### Set 2 (Nov 30–Dec 6, 2026)

| Code | Activity | Description | Folder |
|------|----------|-------------|--------|
| N4 | Basic HTTP Server | Web server built with the `http` module on port 8000, with Home, About, and Contact pages and a 404 page for any other URL. | [set2/n4-server](set2/n4-server/) |
| N5 | REST-style API | Books API with GET, POST, PUT, and DELETE endpoints that send and receive JSON, using an in-memory array. | [set2/n5-api](set2/n5-api/) |
| N6 | Middleware and API Testing | The N5 API extended with a custom logger middleware and a JSON header middleware, tested with the REST Client extension. | [set2/n6-middleware](set2/n6-middleware/) |

---

## Requirements

- Node.js and npm (check with `node -v` and `npm -v`)

Clone the repository and go into it:

```bash
git clone https://github.com/Ella-Eiram/ELEC3-Nodejs-Untalan.git
cd ELEC3-Nodejs-Untalan
```

---

## How to Run – Set 1

### N1 – Project Setup and Package Management

`node_modules` is not included in this repository, so install the packages first:

```bash
cd set1/n1-setup
npm install
npm start
```

For development with automatic restarts, run `npm run dev` (uses nodemon).

Written answers: [N1_answers.pdf](set1/n1-setup/N1_answers.pdf)

![N1 version check](set1/n1-setup/screenshots/N1_node-npm.png)
![N1 package.json](set1/n1-setup/screenshots/N1_packagejson.png)
![N1 npm start output](set1/n1-setup/screenshots/N1_npmstart.png)

### N2 – Modular Calculator

```bash
cd set1/n2-calculator
node index.js <operation> <numbers...>
```

Operations: `add`, `subtract`, `multiply`, `divide`, `average`

Examples:

```bash
node index.js add 12 8          # 12 + 8 = 20
node index.js average 12 8 10   # average of 12, 8, 10 = 10
node index.js divide 12 0       # Error: Cannot divide by zero.
node index.js power 2 3         # Error: Unknown operation "power".
```

![N2 all operations and error cases](set1/n2-calculator/screenshots/n2_all_operations.png)

### N3 – File Manager with fs and path

```bash
cd set1/n3-file-manager
node index.js <command> [filename] ["content"]
```

| Command | Example | What it does |
|---------|---------|--------------|
| create | `node index.js create notes.txt "Hello"` | Creates a new file with content |
| read | `node index.js read notes.txt` | Displays a file's contents |
| update | `node index.js update notes.txt "More text"` | Appends text to a file |
| delete | `node index.js delete notes.txt` | Deletes a file |
| list | `node index.js list` | Shows every file's full path, name, extension, and contents |

All files are stored in the `files` folder.

![N3 create, read, update, and delete](set1/n3-file-manager/screenshots/n3_crud.png)
![N3 list command](set1/n3-file-manager/screenshots/n3_list.png)

---

## How to Run – Set 2

N4, N5, and N6 all use port 8000, so run only one at a time. Stop a server with **Ctrl + C**.

### N4 – Basic HTTP Server

```bash
cd set2/n4-server
npm start
```

Then open `http://localhost:8000` in a browser.

| URL | Page | Status |
|-----|------|--------|
| `/` | Home (name and section) | 200 |
| `/about` | About Me | 200 |
| `/contact` | Contact | 200 |
| any other URL | Page not found | 404 |

![N4 home page](set2/n4-server/screenshots/n4_home.png)
![N4 about page](set2/n4-server/screenshots/n4_about.png)
![N4 contact page](set2/n4-server/screenshots/n4_contact.png)
![N4 404 page](set2/n4-server/screenshots/n4_404.png)

### N5 – REST-style API

```bash
cd set2/n5-api
npm start
```

The API runs at `http://localhost:8000/api/books`. See the [N5 README](set2/n5-api/README.md) for all endpoints.

| Method | Endpoint | What it does |
|--------|----------|--------------|
| GET | `/api/books` | Returns all books |
| GET | `/api/books/:id` | Returns one book (404 if not found) |
| POST | `/api/books` | Adds a new book (returns 201) |
| PUT | `/api/books/:id` | Updates a book |
| DELETE | `/api/books/:id` | Removes a book |

![N5 endpoint tests](set2/n5-api/screenshots/n5_curl_tests.png)

### N6 – Middleware and API Testing

```bash
cd set2/n6-middleware
npm start
```

Every request passes through two middleware functions before reaching the routes:

1. **logger** – prints the method, URL, and date/time of each request in the terminal
2. **jsonHeader** – sets `Content-Type: application/json` for every response

To test the endpoints, open [requests.http](set2/n6-middleware/requests.http) in VS Code with the REST Client extension and click **Send Request** above each request.

Written answers: [N6_answers.pdf](set2/n6-middleware/N6_answers.pdf)

![N6 GET all books](set2/n6-middleware/screenshots/n6_get_all.png)
![N6 GET one book](set2/n6-middleware/screenshots/n6_get_one.png)
![N6 POST a book](set2/n6-middleware/screenshots/n6_post.png)
![N6 PUT a book](set2/n6-middleware/screenshots/n6_put.png)
![N6 DELETE a book](set2/n6-middleware/screenshots/n6_delete.png)
![N6 logger output](set2/n6-middleware/screenshots/n6_logger.png)

---

## Repository Structure

```
ELEC3-Nodejs-Untalan/
├── README.md
├── .gitignore
├── set1/
│   ├── n1-setup/
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── N1_answers.pdf
│   │   └── screenshots/
│   ├── n2-calculator/
│   │   ├── index.js
│   │   ├── operations.js
│   │   ├── formatter.js
│   │   └── screenshots/
│   └── n3-file-manager/
│       ├── index.js
│       ├── files/
│       └── screenshots/
└── set2/
    ├── n4-server/
    │   ├── package.json
    │   ├── server.js
    │   └── screenshots/
    ├── n5-api/
    │   ├── package.json
    │   ├── server.js
    │   ├── README.md
    │   └── screenshots/
    └── n6-middleware/
        ├── package.json
        ├── server.js
        ├── requests.http
        ├── README.md
        ├── N6_answers.pdf
        └── screenshots/
```
