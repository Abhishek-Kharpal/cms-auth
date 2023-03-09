const db = require('../../database/models/index');
const bcrypt = require('bcryptjs');

const register = async (email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const existingUser = await db.user.findOne({
    where: {
      email
    }
  });
  if(existingUser){
    throw new Error('User already exists');
  }
  const user = await db.user.create({
    email,
    password: hashedPassword
  });
  return user;
};

module.exports = {
  register
};