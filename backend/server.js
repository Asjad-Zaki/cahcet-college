const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables synchronized successfully.');
  })
  .catch((err) => {
    console.error('Error synchronizing the database:', err);
  });

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes'); // Ensure this exists or comment out if not ready
const subjectRoutes = require('./routes/subjectRoutes');

// Health Check Endpoint (using a relative path)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use routes with relative paths
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/subjects', subjectRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
