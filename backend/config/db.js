const { Sequelize } = require('sequelize');
require('dotenv').config();

const initializeSequelize = () => {
  const config = {
    host: process.env.MYSQL_HOST || 'sql12.freesqldatabase.com',
    user: process.env.MYSQL_USER || 'sql12768074',
    password: process.env.MYSQL_PASSWORD || '1heSJ4HluT',
    database: process.env.MYSQL_DATABASE || 'sql12768074',
    port: process.env.MYSQL_PORT || 3306
  };

  return new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
      ssl: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
      evict: 1000,
      handleDisconnects: true
    },
    retry: {
      match: [
        /ETIMEDOUT/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ESOCKETTIMEDOUT/,
        /PROTOCOL_CONNECTION_LOST/
      ],
      max: 3
    }
  });
};

const sequelize = initializeSequelize();

// Test the connection with retries
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

const testConnection = async (retryCount = 0) => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection established successfully.');
    return true;
  } catch (err) {
    console.error(`Connection attempt ${retryCount + 1} failed:`, err.message);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return testConnection(retryCount + 1);
    } else {
      console.error('Max retries reached. Could not establish database connection.');
      throw err;
    }
  }
};

// Initialize connection
testConnection().catch(err => {
  console.error('Database connection failed:', err);
});

module.exports = sequelize;
