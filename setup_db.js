// setup_db.js

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const createTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                text TEXT NOT NULL,
                user VARCHAR(100) NOT NULL,
                added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Table created successfully');
        client.release();
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

createTable();
