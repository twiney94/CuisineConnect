const {MongoClient} = require("mongodb");
const databaseName = 'AI-Cooking';
const collectionName = 'favoris';
const client = new MongoClient(process.env.MONGO_DSN);


const addDishToFavoris = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).send('Missing parameters');
    try {
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        const addDishToFavoris = await collection.insertOne({ userId:req.userId ,dishId: id });

        res.status(201).json({ message: "Dish added to favoris" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getFavoris = async (req, res) => {
    try {
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        const favoris = await collection.find({ userId:req.userId }).toArray();
        const dishes = [];
        const dishCollection = database.collection('dish');
        for (const favorisElement of favoris) {
            const dish = await dishCollection.findOne({ id: favorisElement.dishId });
            dishes.push(dish);
        }
        res.status(200).json({dishes});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const deleteDishFromFavoris = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).send('Missing parameters');
    try {
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        const deleteDishFromFavoris = await collection.deleteOne({ userId:req.userId ,dishId: id });
        res.status(201).json({ message: "Dish deleted from favoris" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {addDishToFavoris, getFavoris, deleteDishFromFavoris};