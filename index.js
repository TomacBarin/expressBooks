import express from "express";
const app = express();
const port = 3000;

// Så att Express kan läsa JSON:
app.use(express.json());

// Databas:
const books = [
  { id: 1, title: "The Metamorphosis", author: "Franz Kafka" },
  { id: 2, title: "Dead Souls", author: "Nicolaj Gogol" },
  { id: 5, title: "Den store blondino", author: "Sture Dahlström" },
];

// MIDDLEWARE, test: Logga alla anrop i terminal!
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// Hämtar alla böcker:
app.get("/books", (req, res) => {
  res.json(books);
});

// Hämtar specifik bok:
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id); // DET ÄR DEN HÄR som konverterar string ("3") till 3

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

// RADERA bok
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Hittas bokens index:
  const index = books.findIndex((b) => b.id === id);

  // 404 - Om boken inte finns
  if (index === -1) {
    return res.status(404).json({ message: "Boken hittades inte." });
  }

  // Ta bort bok från array
  const deleteBook = books.splice(index, 1)[0];

  // Meddelande: Raderingen lyckades
  res.json({
    message: "Boken raderades",
    bok: deleteBook, //Visar vilken bok som raderades.
  });
});

// Öva på req.params.id:
// Route ska svara med "Hej Namn" när routen besöks
app.get("/hello/:name", (req, res) => {
  const name = req.params.name;

  res.send(`Hej hej ${name}, hej på dig ${name}!`);
});

//Mer req.params.id-övning:
app.get("/hello/:name/:age", (req, res) => {
  const name = req.params.name;
  const age = req.params.age;

  const ageNumber = parseInt(age);

  if (isNaN(ageNumber)) {
    return res.status(400).send("Åldern måste vara ett nummer!");
  }

  res.send(`Hej ${name}, du är ${ageNumber} år gammal.`);
});

// Route för startsidan
app.get("/", (req, res) => {
  res.send("Första servertest, jorå, så att det, haom.");
});

// En extra route som exempel
app.get("/hello", (req, res) => {
  res.send("Hej världen!");
});

// Snabb test
app.get("/mittens", (req, res) => {
  res.send("Min katt heter Mittens. <br>Min mitt heter Kattens.");
});

app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
  console.log("Öppna webbläsaren, tuta och kör!");
});
