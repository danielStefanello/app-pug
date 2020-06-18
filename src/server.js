const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.set('views', path.join(__dirname, '..', 'views'));

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, console.log(`Running in http://localhost:${port}`));
