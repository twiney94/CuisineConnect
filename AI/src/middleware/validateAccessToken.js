const jwt = require('jsonwebtoken');


const validateAccessToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return res.status(401).send('Access token is missing');
    const accessToken = authorizationHeader.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Access token is invalid');
        req.userId = decoded.id;
        next();
    })
}

module.exports = {validateAccessToken};