const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config'); // To get port if needed

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'My Node.js API', // API Title
      version: '1.0.0', // API version
      description: 'API documentation for the Node.js backend application',
      contact: {
        name: 'Your Name / Team',
        // url: 'yourwebsite.com',
        // email: 'your.email@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/v1`, // Base URL for V1 API
        description: 'Development server (V1)',
      },
      // Add other servers like staging or production if needed
    ],
    // Define components like security schemes and schemas globally
    // Schemas are automatically picked up from JSDoc comments in models/routes
    components: {
        securitySchemes: {
            bearerAuth: { // Matches the name used in route security definitions
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        // Schemas defined in models/routes/validations using @swagger JSDoc tags
        // will be automatically added here by swagger-jsdoc
    },
    // Define security globally (optional, can be applied per-route)
    // security: [{
    //   bearerAuth: [] // Requires bearerAuth for all routes unless overridden
    // }]
  },
  // Path to the API specs files (routes, models where JSDoc annotations are present)
  apis: [
      './src/models/*.js',
      './src/routes/v1/*.js',
      './src/validations/*.js', // Include validations if they have schema definitions
      './src/controllers/*.js' // Include controllers if they have definitions
    ],
};

// You don't need to call swaggerJsdoc here.
// 'app.js' calls it: const specs = swaggerJsdoc(swaggerOptions);
module.exports = { swaggerOptions };

