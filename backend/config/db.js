const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.MYSQL_HOST) {
  // Use individual variables for Railway or local development
  const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_PORT
  } = process.env;

  sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Fallback for local development
  sequelize = new Sequelize('student', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
  });
}

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('MySQL connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to MySQL:', err);
  });

module.exports = sequelize;
