const db = require('../../database/models/index');
const bcrypt = require('bcryptjs');

const register = async (username, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const existingUser = await db.user.findOne({
    where: {
      username
    }
  });
  if(existingUser){
    throw new Error('User already exists');
  }
  const user = await db.user.create({
    username,
    password: hashedPassword
  });
  return user;
};

module.exports = {
  register
};