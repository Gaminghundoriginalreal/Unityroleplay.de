const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const postsFile = path.join(__dirname, 'posts.json');

app.use(express.static('public'));
app.use(express.json());

// Lade Beiträge
app.get('/api/posts', (req, res) => {
  if (!fs.existsSync(postsFile)) {
    fs.writeFileSync(postsFile, JSON.stringify([]));
  }
  const data = fs.readFileSync(postsFile);
  res.json(JSON.parse(data));
});

// Speichere neuen Beitrag
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Titel und Inhalt erforderlich' });

  const newPost = {
    title,
    content,
    date: new Date().toISOString()
  };

  let posts = [];
  if (fs.existsSync(postsFile)) {
    posts = JSON.parse(fs.readFileSync(postsFile));
  }

  posts.unshift(newPost);
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));

  res.status(201).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Forum läuft auf http://localhost:${PORT}`);
});
