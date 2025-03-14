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
      port: MYSQL_PORT
    });

    console.log('Successfully connected to the database!');
    
    // Test a simple query
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    console.log('Test query result:', rows);

    await connection.end();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection(); 