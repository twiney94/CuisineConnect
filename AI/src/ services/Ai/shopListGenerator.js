const {openai} = require("../../config/openaiConfiguration")


//Génération de liste de courses intelligente
const shopListGenerator = async (req, res) => {

    const {recipe, language} = req.body;

    try {
        let response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {"role": "system", "content": generatePromptSystem(language)},
                {"role": "user", "content": generatePrompt(recipe)}
            ]
        });
        const openaiResponse = JSON.parse(response.choices[0].message.content);
        const shoppingList = openaiResponse.shoppingList;

        res.status(200).json({shoppingList});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

function generatePromptSystem (language) {
    return "you are a chef and all your answers will be formatted as JSON key/value" +
        "Answer in this " + JSON.stringify(language) + " language."
}

function generatePrompt (recipe) {

    return "Give me a shopping list based on the following recipe " + JSON.stringify(recipe) +
        "return as an array shoppingList"
}

module.exports = {shopListGenerator}