const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SDC Project API",
      version: "1.0.0",
      description: "API documentation for SDC project",
    },
    servers: [
      {
        url: "http://localhost:5000", // Update with your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("✅ Swagger Docs available at http://localhost:5000/api-docs");
};

module.exports = swaggerDocs;
