const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

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
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;
