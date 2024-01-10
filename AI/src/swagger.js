const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "4.17.4",
    info: {
      title: "AI COOK API",
      version: "1.0.0",
      description: "AI COOK documentation of API endpoints",
    },
    servers: [
      {
        url: process.env.API_PUBLIC_URL, // Replace with your server URL
      },
    ],
  },
  apis: ["./src/app.js"], // Replace with your API routes directory
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
