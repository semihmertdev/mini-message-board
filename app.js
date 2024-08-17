const express = require('express');
const path = require('path');
const pool = require('./db'); // Adjust the path if needed

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages');
        res.render('index', { messages: result.rows });
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).send('Database query failed.');
    }
});

app.get('/new', (req, res) => {
    res.render('form');
});

app.post('/new', async (req, res) => {
    const { text, username } = req.body;
    try {
        await pool.query('INSERT INTO messages (text, username) VALUES ($1, $2)', [text, username]);
        res.redirect('/');
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).send('Database query failed.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
