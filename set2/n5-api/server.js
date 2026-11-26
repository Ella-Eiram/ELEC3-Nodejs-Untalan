// Name: Rhuella Marie Untalan
// Section: IV-BSIT A
// Activity: N5
// Date: December 2, 2026
// server.js - REST-style API for books using the built-in http module

const http = require("http");

const PORT = 8000;

// Data is kept in an array (no database)
let books = [
  { id: 1, title: "Noli Me Tangere", author: "Jose Rizal", year: 1887 },
  { id: 2, title: "El Filibusterismo", author: "Jose Rizal", year: 1891 },
  { id: 3, title: "Dekada '70", author: "Lualhati Bautista", year: 1983 },
];

// Sends any data as JSON with the given status code
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// Reads the request body and turns it into a JavaScript object
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Split "/api/books/2" into ["api", "books", "2"]
  const parts = req.url.split("/").filter(Boolean);
  const isBooksRoute = parts[0] === "api" && parts[1] === "books";
  const id = parts[2] ? Number(parts[2]) : null;

  if (!isBooksRoute || parts.length > 3) {
    return sendJson(res, 404, { message: "Route not found" });
  }

  try {
    // GET /api/books - all books
    if (req.method === "GET" && id === null) {
      return sendJson(res, 200, books);
    }

    // GET /api/books/:id - one book
    if (req.method === "GET") {
      const book = books.find((b) => b.id === id);
      if (!book) {
        return sendJson(res, 404, { message: `Book with id ${id} not found` });
      }
      return sendJson(res, 200, book);
    }

    // POST /api/books - add a book
    if (req.method === "POST" && id === null) {
      const { title, author, year } = await readBody(req);
      if (!title || !author) {
        return sendJson(res, 400, { message: "title and author are required" });
      }
      const newId = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
      const newBook = { id: newId, title, author, year: year || null };
      books.push(newBook);
      return sendJson(res, 201, newBook);
    }

    // PUT /api/books/:id - update a book
    if (req.method === "PUT" && id !== null) {
      const book = books.find((b) => b.id === id);
      if (!book) {
        return sendJson(res, 404, { message: `Book with id ${id} not found` });
      }
      const { title, author, year } = await readBody(req);
      if (title) book.title = title;
      if (author) book.author = author;
      if (year) book.year = year;
      return sendJson(res, 200, book);
    }

    // DELETE /api/books/:id - remove a book
    if (req.method === "DELETE" && id !== null) {
      const book = books.find((b) => b.id === id);
      if (!book) {
        return sendJson(res, 404, { message: `Book with id ${id} not found` });
      }
      books = books.filter((b) => b.id !== id);
      return sendJson(res, 200, { message: `Book with id ${id} deleted`, book });
    }

    // Any other method on this route
    return sendJson(res, 405, { message: `${req.method} is not allowed here` });
  } catch (err) {
    // Happens when the request body is not valid JSON
    return sendJson(res, 400, { message: "Invalid JSON in request body" });
  }
});

server.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}/api/books`);
});