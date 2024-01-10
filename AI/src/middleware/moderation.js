const {openai} = require("../config/openaiConfiguration");

const moderate = async (req, res, next) => {
  const message = req.body.message;
  let response = await openai.moderations.create({
    input: message,
    model: "text-moderation-latest"
  });
  // return response.results[0]
  const flag = response.results[0].flagged;
  if (flag) {
    res.status(403).json({message: "This message is not allowed"});
  }
  next();
}
module.exports = {moderate}