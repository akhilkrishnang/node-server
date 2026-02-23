/**
 * API Key Authentication Middleware
 *
 * Allows all GET requests without authentication.
 * Requires X-Api-Key header for POST, PUT, DELETE requests.
 */
const validateApiKey = (req, res, next) => {
  // Allow all GET requests without authentication
  if (req.method === 'GET') {
    return next();
  }

  // For POST, PUT, DELETE - require valid API key
  const apiKey = req.headers['x-api-key'];
  const validApiKeys = process.env.API_KEYS
    ? process.env.API_KEYS.split(',').map((key) => key.trim())
    : ['default-hive-key'];

  if (!apiKey || !validApiKeys.includes(apiKey)) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or missing API key',
      message: 'Please provide a valid X-Api-Key header for write operations',
    });
  }

  next();
};

module.exports = validateApiKey;
