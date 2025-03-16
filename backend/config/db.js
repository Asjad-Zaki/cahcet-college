const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.MYSQL_HOST) {
  // Use environment variables for InfinityFree
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
      connectTimeout: 60000,
      ssl: {
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  // Fallback for local development
  sequelize = new Sequelize('if0_38519883_cahcetcollege', 'if0_38519883', '0DWsrNoWGnRCQB', {
    host: 'sql206.infinityfree.com',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 60000
    }
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
