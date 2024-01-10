require('dotenv').config();
const app = require('./app')

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log('Server listening on port 3000');
});

module.exports = server;