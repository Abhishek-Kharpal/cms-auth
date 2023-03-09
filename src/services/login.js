const db = require('../../database/models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { redisClient } = require('../utils/redisUtil');
const login = async (username, password) => {
  const user = await db.user.findOne({
    where: {
      username
    }
  });
  if(!user){
    throw new Error('User does not exist');
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword){
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ id: user.id }, (process.env.JWT_SECRET), { expiresIn: '1h' });
  await redisClient.set(token, user.id, 'EX', 3600);
  return token;
};

module.exports = {
  login
};