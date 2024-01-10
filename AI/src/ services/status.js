const status = async (req, res) => {

    return await res.status(200).send('connection Ok');
}

module.exports={status}