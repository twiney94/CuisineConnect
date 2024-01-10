const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {MongoClient} = require("mongodb");
const databaseName = 'AI-Cooking';
const collectionName = 'users';
const client = new MongoClient(process.env.MONGO_DSN);

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Missing parameters');
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    try {

        const user = await collection.findOne({ email:email});
        const hashedPassword = user.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log("hashedPassword:", hashedPassword);
        console.log("user:", user);
        if (!isMatch) return res.status(400).send('Wrong email or password');
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    }
    catch (error) {
        console.log(error);
        res.status(500)
    }

}

module.exports = {login};