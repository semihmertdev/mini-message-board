const { Pool } = require('pg');
require('dotenv').config(); // Ensure this line is present

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = pool;
