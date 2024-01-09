require('dotenv').config();
const app = require('./app')


const server = app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

module.exports = {server}