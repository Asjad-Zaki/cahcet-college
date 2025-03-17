const mysql = require('mysql2/promise');
require('dotenv').config();

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT
} = process.env;

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      port: MYSQL_PORT,
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('Successfully connected to the database.');
    await connection.end();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection(); 