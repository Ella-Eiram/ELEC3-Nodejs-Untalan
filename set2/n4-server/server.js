// Name: Rhuella Marie Untalan
// Section: IV-BSIT A
// Activity: N4
// Date: December 1, 2026
// server.js - basic web server using the built-in http module

const http = require("http");

const PORT = 8000;

// Shared page layout so every page looks the same
function page(title, body) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 640px; margin: 40px auto; padding: 0 16px; }
    nav a { margin-right: 12px; }
  </style>
</head>
<body>
  <nav><a href="/">Home</a><a href="/about">About</a><a href="/contact">Contact</a></nav>
  <h1>${title}</h1>
  ${body}
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(page("Home", `
      <p>Welcome to my Node.js server!</p>
      <p><strong>Name:</strong> Rhuella Marie Untalan</p>
      <p><strong>Section:</strong> IV-BSIT A</p>`));

  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(page("About Me", `
      <p>Hi! I am Rhuella Marie Untalan from IV-BSIT A. I am a 4th year BSIT student. I love to read a wattpad stories and do a cafe hopping.</p>`));

  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(page("Contact", `
      <p><strong>GitHub:</strong> <a href="https://github.com/Ella-Eiram">Ella-Eiram</a></p>
      <p><strong>Email:</strong> 23ln5223_ms@ps.edu.ph</p>`));

  } else {
    // Any other URL
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(page("404 - Page not found",
      `<p>Sorry, "${req.url}" does not exist.</p>`));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});