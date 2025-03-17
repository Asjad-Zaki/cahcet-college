const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced security middleware
app.use(helmet());
app.use(bodyParser.json({ limit: '10kb' }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://cahcetcollege-frontend.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Database synchronization with production-safe approach
const syncDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      await sequelize.sync();
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

// Enhanced health check endpoint
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    database: sequelize.config.database,
    dbStatus: sequelize.authenticate() ? 'connected' : 'disconnected'
  });
});

// Rate limiting for API endpoints
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api/', apiLimiter);

// Routes
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));

// Enhanced error handling
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
  console.error(err.stack);
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Server startup
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`CORS configured for: ${process.env.FRONTEND_URL || 'https://cahcetcollege-frontend.onrender.com'}`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});