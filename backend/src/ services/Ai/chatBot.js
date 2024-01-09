const { openai } = require('../../config/openaiConfiguration');

//create a ChatBot using OpenAI API
const chatBot = async (req, res) => {
    const { message, language } = req.body;

    try {
        let response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: 'system', content: generatePromptSystem(language) },
            { role: 'user', content: message },
        ],
        });
        const answer = JSON.stringify(response.choices[0].message.content);
        res.status(200).json({ answer });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

function generatePromptSystem(language = "french") {
    return 'you are a Michelin-starred chef with 15 years of experience in the profession with several culinary competitions won internationally and' + 'Answer in this ' + JSON.stringify(language) + ' language.';
}

module.exports = { chatBot };