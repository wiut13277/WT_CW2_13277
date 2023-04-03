const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { posts });
});

router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/new', (req, res) => {
  const { title, body } = req.body;
  const id = posts.length + 1;
  const post = { id, title, body };
  posts.push(post);
  res.redirect('/');
});

router.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);
  if (!post) {
    res.sendStatus(404);
  } else {
    res.render('edit', { post });
  }
});

router.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);
  if (!post) {
    res.sendStatus(404);
  } else {
    post.title = req.body.title;
    post.body = req.body.body;
    res.redirect('/');
  }
});

router.get('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) {
    res.sendStatus(404);
  } else {
    posts.splice(index, 1);
    res.redirect('/');
  }
});

module.exports = router;
