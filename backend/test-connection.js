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
      host: MYSQL_HOST || 'sql12.freesqldatabase.com',
      user: MYSQL_USER || 'sql12768074',
      password: MYSQL_PASSWORD || '1heSJ4HluT',
      database: MYSQL_DATABASE || 'sql12768074',
      port: MYSQL_PORT || 3306,
      ssl: false
    });

    console.log('Successfully connected to the database.');
    await connection.end();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection(); 