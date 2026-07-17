const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');
const validateApiKey = require('./middleware/apiKeyAuth');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:4200,http://127.0.0.1:4200').split(',').map((origin) => origin.trim()).filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key', 'Accept', 'Origin', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(cors(corsOptions));
app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  if (requestOrigin) {
    res.header('Access-Control-Allow-Origin', requestOrigin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Api-Key,Accept,Origin,X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});
app.options('*', cors(corsOptions), (req, res) => {
  res.sendStatus(204);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'API Server is running', environment: process.env.NODE_ENV });
});

// Component imports
const theHappyHiveRouter = require('./components/the_happy_hive/routes');
const spotlightRouter = require('./components/the_happy_hive/spotlight-routes');

// Apply API Key authentication middleware to all /api routes
app.use('/api/', validateApiKey);

// Register component routes
app.use('/api/happy-hive', theHappyHiveRouter);
app.use('/api/spotlight', spotlightRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server with database connection check
const startServer = async () => {
  try {
    // Test database connection before starting server
    const dbConnected = await testConnection();
    if (!dbConnected && process.env.NODE_ENV === 'production') {
      console.error('Cannot start server: Database connection failed');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

// Only start server if this is the main module
if (require.main === module) {
  startServer();
}

module.exports = app;
