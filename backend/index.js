const express = require('express');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`Request ${req.method} ${req.originalUrl}`);
  next();
})

app.get('/', (req, res) => {
  res.send('hello world');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
