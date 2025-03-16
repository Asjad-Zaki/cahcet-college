const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(bodyParser.json({ limit: '10kb' }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://cahcetcollege-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(compression());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', apiLimiter);

// Health check endpoint
app.get('/api/status', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: 'ok',
      environment: process.env.NODE_ENV || 'development',
      database: sequelize.config.database,
      dbStatus: 'connected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      dbStatus: 'disconnected',
      error: error.message
    });
  }
});

// Routes
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Database sync and server start
const syncDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      await sequelize.sync(); // Use migrations in production
    } else {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized with alter');
    }
    console.log('Database connection established');
  } catch (error) {
    console.error('Database synchronization failed:', error);
    process.exit(1);
  }
};

syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`CORS configured for: ${process.env.FRONTEND_URL || 'https://cahcetcollege-frontend.onrender.com'}`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});