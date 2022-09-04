const express = require('express');
const books = require('./books');

const app = express();
const port = 3000;

app.use(express.json()) ;
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

  if (result) {
    res.json(result);
  } else {
    sendError(res, 404, `Book with id of ${bookId} not found`);
  }
});

app.post('/api/books', (req, res) => {
  const data = req.body;
  const required = [
    'title', 'author', 'dateOfPublishing',
    'description', 'pages', 'price'
  ];

  const missingProperty = [];
  for (let property of required) {
    if(!data.hasOwnProperty(property)) {
        missingProperty.push(property);
    }
  }

  if(missingProperty.length > 0) {
    sendError(res, 400, `The ${missingProperty} are missing`);
  }

  const newBook = {
    id: books.length + 1,
    title: data.title,
    author: data.author,
    dateOfPublishing: data.dateOfPublishing,
    image: data.image || '',
    description: data.description,
    pages: data.pages,
    price: data.price,
    read: data.read || false
  }

  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const data = req.body;
  const bookId = req.params.id;
  const currentBook = books.find((books) => books.id === parseInt(bookId));

  if (!currentBook) {
    return res.sendStatus(204);
  }

  const required = [
    'title', 'author', 'dateOfPublishing',
    'description', 'pages', 'price'
  ];

  const missingProperty = [];
  for(let property of required) {
    if(!data.hasOwnProperty(property)) {
        missingProperty.push(property);
    }
  }

  if(missingProperty.length > 0) {
    sendError(res, 400, `The ${missingProperty} are missing`);
  }

  const updatedBook = {
    id: currentBook.id,
    title: data.title,
    author: data.author,
    dateOfPublishing: data.dateOfPublishing,
    image: data.image || currentBook.image,
    description: data.description,
    pages: data.pages,
    price: data.price,
    read: data.read || currentBook.read
  }

  const index = books.indexOf(currentBook);
  books[index] = updatedBook;

  res.status(200).json(updatedBook);
})


app.delete('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  const index = books.findIndex((book) => book.id === parseInt(bookId));
  books.splice(index, 1);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

function sendError(res, statusCode, message) {
  res.status(statusCode).json({code: statusCode, message: message});
}
