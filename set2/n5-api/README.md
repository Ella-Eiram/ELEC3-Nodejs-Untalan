# N5 – REST-style API (Books)

**Rhuella Marie Untalan | IV-BSIT A | ELEC 3 – Node.js**

A simple REST-style API built with the built-in `http` module. The data is kept in an array inside the program (no database), starting with 3 sample books.

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