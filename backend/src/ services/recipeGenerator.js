const {openai} = require("../config/openaiConfiguration")

const {MongoClient} = require("mongodb");
const databaseName = 'AI-Cooking';
const collectionName = 'dish';
const client = new MongoClient(process.env.MONGO_DSN);

// moteur de recherche intelligent de recette
const findRecipe = async (req, res) => {
    const {query, language} = req.body;
    try {
        const dishes = await dishesGenerator(query, language);
        console.log("dishes:", dishes);
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        let dishRecipe = null;
        for (const dish of dishes) {
            dishRecipe = await collection.findOne({dish: dish});
            if (dishRecipe) {
                res.status(200).json({dishRecipe});
                break;
            }
        }
        if (!dishRecipe) {
            res.status(404).json({message: "Dish not found"});
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}


const dishesGenerator = async (ingredients, language) => {
    try {
        let response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {"role": "system", "content": generatePromptSystem(language)},
                {"role": "user", "content": generatePrompt(ingredients)}
            ]
        });
        const openaiResponse = JSON.parse(response.choices[0].message.content);
        console.log("openaiResponse:", openaiResponse);
        return  openaiResponse.dishes;

    } catch (error) {
        console.log(error);
    }a
}

function generatePromptSystem (language) {
    return "you are a chef and all your answers will be formatted as JSON key/value" +
        "Answer in this " + JSON.stringify(language) + " language."
}

function generatePrompt (query) {

    return "Find me 10 dishes names based on this query " + JSON.stringify(query) +
        "return as an array dishes "
}

module.exports = {findRecipe}