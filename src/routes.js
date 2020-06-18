const { Router } = require('express');
const { getComments, setComments } = require('./controllers');

const routes = new Router();

routes.get('/', async (request, response) => {
  const comments = await getComments();
  const count = comments.length;
  const sun = comments.reduce((accum, comment) => {
    return accum + Number(comment.rate);
  }, 0);
  const average =
    comments.length !== 0 ? Number(Math.round(sun / comments.length)) : 0;

  response.render('index', { comments, count, average });
});

routes.post('/comments', async (request, response) => {
  const { body: { comment, rate } = {} } = request;

  const result = await setComments(comment, rate);

  response.redirect('/');
});

module.exports = routes;
