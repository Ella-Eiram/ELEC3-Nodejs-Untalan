// Name: Rhuella Marie Untalan
// Section: IV-BSIT A
// Activity: N6
// Date: December 3, 2026
// server.js - N5 books API extended with custom middleware

const http = require("http");

const PORT = 8000;

let books = [
  { id: 1, title: "Noli Me Tangere", author: "Jose Rizal", year: 1887 },
  { id: 2, title: "El Filibusterismo", author: "Jose Rizal", year: 1891 },
  { id: 3, title: "Dekada '70", author: "Lualhati Bautista", year: 1983 },
];

// ===================== MIDDLEWARE =====================

// Middleware 1: logs the method, URL, and date/time of every request
function logger(req, res, next) {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next(); // pass the request to the next middleware
}

// Middleware 2: sets the JSON header for every response,
// so the route handlers no longer need to repeat it
function jsonHeader(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
}

// The middleware run in this order before the routes
const middlewares = [logger, jsonHeader];

// Runs each middleware one by one; each one calls next()
// to move on. After the last one, the routes run.
function runMiddleware(req, res, finalHandler) {
  let index = 0;
  function next() {
    const middleware = middlewares[index];
    index++;
    if (middleware) {
      middleware(req, res, next);
    } else {
      finalHandler(req, res);
    }
  }
  next();
}

// ===================== HELPERS =====================

// Sends data as JSON. No Content-Type here anymore:
// the jsonHeader middleware already set it.
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

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

// ===================== ROUTES =====================

async function routes(req, res) {
  const parts = req.url.split("/").filter(Boolean);
  const isBooksRoute = parts[0] === "api" && parts[1] === "books";
  const id = parts[2] ? Number(parts[2]) : null;

  if (!isBooksRoute || parts.length > 3) {
    return sendJson(res, 404, { message: "Route not found" });
  }

  try {
    // GET /api/books
    if (req.method === "GET" && id === null) {
      return sendJson(res, 200, books);
    }

    // GET /api/books/:id
    if (req.method === "GET") {
      const book = books.find((b) => b.id === id);
      if (!book) {
        return sendJson(res, 404, { message: `Book with id ${id} not found` });
      }
      return sendJson(res, 200, book);
    }

    // POST /api/books
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

    // PUT /api/books/:id
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

    // DELETE /api/books/:id
    if (req.method === "DELETE" && id !== null) {
      const book = books.find((b) => b.id === id);
      if (!book) {
        return sendJson(res, 404, { message: `Book with id ${id} not found` });
      }
      books = books.filter((b) => b.id !== id);
      return sendJson(res, 200, { message: `Book with id ${id} deleted`, book });
    }

    return sendJson(res, 405, { message: `${req.method} is not allowed here` });
  } catch (err) {
    return sendJson(res, 400, { message: "Invalid JSON in request body" });
  }
}

// ===================== SERVER =====================

// Every request goes through the middleware first, then the routes
const server = http.createServer((req, res) => {
  runMiddleware(req, res, routes);
});

server.listen(PORT, () => {
  console.log(`API with middleware is running at http://localhost:${PORT}/api/books`);
});