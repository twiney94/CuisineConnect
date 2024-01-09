const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // Path to your Swagger configuration file
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config()
const {status} = require("./ services/status");
const {findRecipe} = require("./ services/recipeGenerator");
const {recipeRecommendation, accompanimentGenerator} = require("./ services/recommendation");
const {shopListGenerator} = require("./ services/shopListGenerator");
const {moderate} = require("./middleware/moderation");
const {chatBot} = require("./ services/chatBot");

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());

/**
 * @swagger
 * tags:
 *   name: AI Cooking
 *   description: API endpoint
 *
 */

app.post("/findRecipe", findRecipe);
app.post("/recipeRecommendation", recipeRecommendation);
app.post("/accompanimentGenerator", accompanimentGenerator);
app.post("/shoppingList", shopListGenerator);
/**
 * @swagger
 * /status:
 *   get:
 *     summary: get service status
 *     tags: [status]
 *     responses:
 *       200:
 *         description: service ok
 *       400:
 *         description: service unavailable
 */

app.post("/chatbot", moderate, chatBot);

app.get("/status", status);

module.exports = app;
