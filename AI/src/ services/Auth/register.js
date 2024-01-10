const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {SALT} = require("../../utils/constant");
const {MongoClient} = require("mongodb");
const databaseName = 'AI-Cooking';
const collectionName = 'users';
const client = new MongoClient(process.env.MONGO_DSN);

const register = async (req, res) => {
    const { email, password, username, allergies, contraindication } = req.body;
    if (!email || !password ) return res.status(400).send('Missing parameters');
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    const existingAccount = await collection.findOne({ email: email });
    if (existingAccount) return res.status(400).send('Email already used');

    try {
        const hashedPassword = await bcrypt.hash(password, SALT);
        const user = await collection.insertOne({ email:email, password:hashedPassword, username:username, allergies:allergies, contraindication:contraindication });
        console.log("user:", user);
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {register};