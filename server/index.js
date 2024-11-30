const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB with error handling
const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

startServer();

// Handle Vercel's feedback script requests
app.use('/_next-live/feedback/feedback.js', (req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' vercel.live");
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// CORS configuration
app.use(cors({
  origin: ['https://git-easy-frontend-diis1yhty-bilalbaheers-projects.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.url} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // MongoDB errors
  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    return res.status(503).json({
      message: 'Database error occurred',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
  
  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      error: err.message
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
