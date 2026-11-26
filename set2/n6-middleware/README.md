# N6 – Middleware and API Testing (Books API)

**Rhuella Marie Untalan | IV-BSIT A | ELEC 3 – Node.js**

This is my N5 books API extended with two custom middleware functions: a **logger** that prints the method, URL, and date/time of every request, and a **JSON header** middleware that sets `Content-Type: application/json` for all responses. Every endpoint was tested with the **REST Client** extension in VS Code (see `requests.http`).

## How to run

```bash
npm start
```

The API runs at `http://localhost:8000/api/books`.

## Endpoints

| Method | Endpoint | What it does | Success status |
|--------|----------|--------------|----------------|
| GET | `/api/books` | Returns all books | 200 OK |
| GET | `/api/books/:id` | Returns one book, or a 404 JSON message if the id does not exist | 200 OK |
| POST | `/api/books` | Adds a new book from the JSON body (`title` and `author` are required) and returns it | 201 Created |
| PUT | `/api/books/:id` | Updates an existing book's title, author, and/or year | 200 OK |
| DELETE | `/api/books/:id` | Removes a book | 200 OK |

## Example request body (POST / PUT)

```json
{
  "title": "Florante at Laura",
  "author": "Francisco Balagtas",
  "year": 1838
}
```

## Error responses

| Status | When |
|--------|------|
| 400 Bad Request | Missing `title`/`author` on POST, or the body is not valid JSON |
| 404 Not Found | The book id does not exist, or the route is wrong |
| 405 Method Not Allowed | A method that the route does not support |