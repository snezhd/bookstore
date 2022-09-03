const express = require('express');
const books = require('./books');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`Request ${req.method} ${req.originalUrl}`);
  next();
})

app.get('/', (req, res) => {
  res.send('hello world');
})

app.get('/api/books', (req, res) => res.json(books));

app.get('/api/books/:id', (req, res) => {
  const found = books.some((books) => books.id === parseInt(req.params.id));

  if(found) {
    res.json(books.filter((books) => books.id === parseInt(req.params.id)));
  } else {
    res.status(404).send(`No book with the id of ${req.params.id}`);
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
