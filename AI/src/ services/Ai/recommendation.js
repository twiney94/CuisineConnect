const {openai} = require("../../config/openaiConfiguration")


//Proposition d’accompagnements intelligente
const accompanimentGenerator = async (req, res) => {
    const {dish, language} = req.body;

    try {
        let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": generatePromptSystem(language)},
                {"role": "user", "content": generateAccompanimentPrompt(dish)}
            ]
        });
        console.log("response:", response);
        console.log("response.choices:", JSON.stringify(response.choices[0].message));
        const openaiResponse = JSON.parse(response.choices[0].message.content);
        const accompagnements = openaiResponse.accompagnements;

        res.status(200).json({accompagnements});
    }
    catch (error) {
        res.status(500).json({error});
    }
}

//Recommandation de recettes intelligente
const recipeRecommendation = async (req, res) => {

    const {dish, language} = req.body;

    try {
        let response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {"role": "system", "content": generatePromptSystem(language)},
                {"role": "user", "content": generatePrompt(dish)}
            ]
        });
        const openaiResponse = JSON.parse(response.choices[0].message.content);
        console.log("openaiResponse:", openaiResponse);
        const recipes = openaiResponse;
        console.log("recipes:", recipes);

        res.status(200).json({recipes});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

function generatePromptSystem (language) {
    return "you are a chef and all your answers will be formatted as JSON key/value" +
        "Answer in this " + JSON.stringify(language) + " language."
}

function generatePrompt (dish) {

    return "Give me similar recipes to make the following dish " + JSON.stringify(dish) +
        "return as an array recipes and respect this format and keep recipes as name :  {\n" +
        "  name: string\n" +
        "  image: string\n" +
        "  difficulty: number(1 to 3)\n" +
        "  prepTime: number\n" +
        "  cookTime: number\n" +
        "}"
}

function generateAccompanimentPrompt (dish) {

    return "offer accompaniments for this"  + JSON.stringify(dish) +  "such as wine, desserts or cheeses " +
        "return as an array  accompagnements\\ "
}

module.exports = {recipeRecommendation, accompanimentGenerator}