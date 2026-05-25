const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Base health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy and running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const chatRoutes = require('./routes/chatRoutes');
const errorHandler = require('./utils/errorMiddleware');

// Mount routes under /v1 namespace
app.use('/v1', chatRoutes);

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Cannot ${req.method} ${req.originalUrl}`,
      status: 404
    }
  });
});

// Global Error Handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  🚀 Server is running on port ${PORT}   `);
  console.log(`  👉 Health check: http://localhost:${PORT}/health`);
  console.log(`  Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`=========================================`);
});
