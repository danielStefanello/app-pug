const { Router } = require('express');
const { getComments, setComments } = require('./controllers');

const routes = new Router();

routes.get('/', (request, response) => {
  getComments().then((comments) => {
    const count = comments.length;
    const sun = comments.reduce((accum, comment) => {
      return accum + Number(comment.rate);
    }, 0);
    const average = Math.round(sun / comments.length);
    response.render('index', { comments, count, average });
  });
});

routes.post('/comments', (request, response) => {
  const { body: { comment, rate } = {} } = request;
  setComments(comment, rate).then((comment) => {
    response.redirect('/');
  });
});

module.exports = routes;
