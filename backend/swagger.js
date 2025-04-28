const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hospital Management System API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            { url: 'http://localhost:5000' }
        ]
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
