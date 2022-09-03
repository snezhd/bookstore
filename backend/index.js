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
  const bookId = req.params.id;
  const result = books.find((books) => books.id === parseInt(bookId));

  if(result) {
    res.json(result);
  } else {
    res.status(404).json({message: `Book with id of ${bookId} not found`});
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
