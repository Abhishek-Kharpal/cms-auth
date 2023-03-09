const {redisClient} = require('../utils/redisUtil');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res) => {
  //get token from header by splitting it from bearer
  const token = req.header('Authorization').split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }
  const redisTokenID = await redisClient.get(token);
  if (!redisTokenID) {
    return res.status(401).json({
      message: 'Please log in',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if(parseInt(decodedToken.id,10) !== parseInt(redisTokenID,10))
    {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
    return res.status(200).json({
      message: 'AUTHORIZED',
    });
  });
}

module.exports = {verifyToken};