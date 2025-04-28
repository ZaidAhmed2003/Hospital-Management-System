const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes'); // Will load all routes index
const config = require('./config/config');
const { swaggerOptions } = require('./config/swagger'); // Optional: separate swagger options
require('./config/passport')(passport); // initialize passport strategy

const app = express();

// Security HTTP headers
app.use(helmet());

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Sanitize data against XSS
app.use(xss());

// Sanitize data against NoSQL injection
app.use(mongoSanitize());

// Enable CORS
app.use(cors());

// Enable gzip compression
app.use(compression());

// Initialize passport
app.use(passport.initialize());

// API routes
app.use('/api', routes);

// Swagger documentation
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;
