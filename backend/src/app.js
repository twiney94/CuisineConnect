const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // Path to your Swagger configuration file
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config()
const {status} = require("./ services/status");
const {findRecipe} = require("./ services/Ai/recipeGenerator");
const {recipeRecommendation, accompanimentGenerator} = require("./ services/Ai/recommendation");
const {shopListGenerator} = require("./ services/Ai/shopListGenerator");
const {moderate} = require("./middleware/moderation");
const {chatBot} = require("./ services/Ai/chatBot");

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*"); // allow all methods
    res.header("Access-Control-Allow-Headers", "*"); // allow all headers
    next();
});

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
