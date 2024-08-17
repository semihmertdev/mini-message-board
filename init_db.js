require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const dropTableQuery = `
  DROP TABLE IF EXISTS messages;
`;

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    "user" VARCHAR(100) NOT NULL,
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const insertMessagesQuery = `
  INSERT INTO messages (text, "user") VALUES
  ('Hi there!', 'Amando'),
  ('Hello World!', 'Charles')
  ON CONFLICT DO NOTHING;
`;

async function initDb() {
  try {
    const client = await pool.connect();
    await client.query(dropTableQuery); // Drop the table if it exists
    await client.query(createTableQuery); // Create the table
    await client.query(insertMessagesQuery); // Insert initial messages
    client.release();
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    pool.end();
  }
}

initDb();
