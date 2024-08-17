const express = require('express');
const app = express();
const pool = require('./db'); // Adjust path to where you initialize your pool

app.set('view engine', 'ejs');
app.set('views', './views'); // Adjust path if necessary

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages');
    const messages = result.rows;
    res.render('index', { title: 'Mini Message Board', messages });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
