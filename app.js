// app.js

const express = require('express');
const app = express();
const ejs = require('ejs');
const pool = require('./db');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Retrieve all messages
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY added DESC');
        res.render('index', { title: 'Mini Messageboard', messages: result.rows });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Display form to add new message
app.get('/new', (req, res) => {
    res.render('form', { title: 'Add New Message' });
});

// Add new message
app.post('/new', async (req, res) => {
    const { messageUser, messageText } = req.body;
    try {
        await pool.query('INSERT INTO messages (text, user) VALUES ($1, $2)', [messageText, messageUser]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Display message details
app.get('/message/:id', async (req, res) => {
    const messageId = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM messages WHERE id = $1', [messageId]);
        const message = result.rows[0];
        if (message) {
            res.render('message', { title: 'Message Details', message });
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Edit message form
app.get('/edit/:id', async (req, res) => {
    const messageId = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM messages WHERE id = $1', [messageId]);
        const message = result.rows[0];
        if (message) {
            res.render('edit', { title: 'Edit Message', message });
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Update message
app.post('/edit/:id', async (req, res) => {
    const messageId = parseInt(req.params.id);
    const { messageUser, messageText } = req.body;
    try {
        await pool.query('UPDATE messages SET text = $1, user = $2 WHERE id = $3', [messageText, messageUser, messageId]);
        res.redirect(`/message/${messageId}`);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Delete message
app.post('/delete/:id', async (req, res) => {
    const messageId = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [messageId]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
