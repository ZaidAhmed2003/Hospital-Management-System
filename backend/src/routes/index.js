const express = require('express');
const router = express.Router();

// Optional: Add a health check or root endpoint for the API
router.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = router;
