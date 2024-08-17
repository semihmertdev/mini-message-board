const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

router.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM messages');
    client.release();
    res.render('index', { title: "Mini Message Board", messages: result.rows });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.render('index', { title: "Mini Message Board", messages: [] });
  }
});

router.get('/new', (req, res) => {
  res.render('form', { title: "New Message" });
});

router.post('/new', async (req, res) => {
  const { messageText, messageUser } = req.body;
  const query = `
    INSERT INTO messages (text, "user", added) VALUES ($1, $2, $3)
  `;
  const values = [messageText, messageUser, new Date()];

  try {
    const client = await pool.connect();
    await client.query(query, values);
    client.release();
    res.redirect('/');
  } catch (err) {
    console.error('Error adding message:', err);
    res.render('form', { title: "New Message", error: 'Error adding message' });
  }
});

// Edit route
router.get('/edit/:id', async (req, res) => {
  const messageId = req.params.id;
  const query = 'SELECT * FROM messages WHERE id = $1';
  try {
    const client = await pool.connect();
    const result = await client.query(query, [messageId]);
    const message = result.rows[0];
    client.release();
    if (message) {
      res.render('edit', { title: "Edit Message", message: message, id: messageId });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.error('Error fetching message:', err);
    res.redirect('/');
  }
});

router.post('/edit/:id', async (req, res) => {
  const messageId = req.params.id;
  const { messageText, messageUser } = req.body;
  const query = `
    UPDATE messages SET text = $1, "user" = $2, added = $3 WHERE id = $4
  `;
  const values = [messageText, messageUser, new Date(), messageId];

  try {
    const client = await pool.connect();
    await client.query(query, values);
    client.release();
    res.redirect('/');
  } catch (err) {
    console.error('Error updating message:', err);
    res.render('edit', { title: "Edit Message", error: 'Error updating message', message: { text: messageText, user: messageUser }, id: messageId });
  }
});

// Delete route
router.post('/delete/:id', async (req, res) => {
  const messageId = req.params.id;
  const query = 'DELETE FROM messages WHERE id = $1';

  try {
    const client = await pool.connect();
    await client.query(query, [messageId]);
    client.release();
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting message:', err);
    res.redirect('/');
  }
});

// Message details route
router.get('/message/:id', async (req, res) => {
  const messageId = req.params.id;
  const query = 'SELECT * FROM messages WHERE id = $1';
  try {
    const client = await pool.connect();
    const result = await client.query(query, [messageId]);
    const message = result.rows[0];
    client.release();
    if (message) {
      res.render('message', { title: "Message Details", message: message });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.error('Error fetching message details:', err);
    res.redirect('/');
  }
});

module.exports = router;
