const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public', {
    setHeaders: function(res, path, stat) {
      if (path.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
      }
    }
  }));
  
  
app.set('view engine', 'pug');

let posts = [];

app.get('/', (req, res) => {
  res.redirect('/posts');
});

app.get('/posts', (req, res) => {
  res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
  res.render('new');
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const post = { id: uuidv4(), title, content, createdAt: new Date() };
  posts.push(post);
  res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find(post => post.id === id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('show', { post });
});

app.get('/posts/:id/edit', (req, res) => {
  const { id } = req.params;
  const post = posts.find(post => post.id === id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('edit', { post });
});

app.post('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find(post => post.id === id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  const { title, content } = req.body;
  post.title = title;
  post.content = content;
  res.redirect(`/posts/${id}`);
});

app.post('/posts/:id/delete', (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) {
    return res.status(404).send('Post not found');
  }
  posts.splice(index, 1);
  res.redirect('/posts');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
