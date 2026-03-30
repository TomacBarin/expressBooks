const express = require("express");
const app = express();
const port = 3000;

// Så att Express kan läsa JSON:
app.use(express.json());

// Mockdata, dockmata:
const books = [
  { id: 1, title: "The Metamorphosis", author: "Franz Kafka" },
  { id: 2, title: "Dead Souls", author: "Nicolaj Gogol" },
];

// Hämtar alla böcker:
app.get("/books", (req, res) => {
  res.json(books);
});

// Hämtar specifik bok:
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Boken hittades inte." });
  }

  res.json(book);
});

// Skapar ny bok:
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  const newBook = {
    id: books.length + 1,
    title: title,
    author: author,
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

// Route för startsidan
app.get("/", (req, res) => {
  res.send("Hej från min första Express-server!");
});

// En extra route som exempel
app.get("/hello", (req, res) => {
  res.send("Hej världen!");
});

app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
  console.log("Öppna webbläsaren och testa!");
});
