const registerService = require('../services/register');

const register = async (req, res) => {
  try{
    const { username, password } = req.body;
    const user = await registerService.register(username, password);
    res.status(200).json(user);
  }
  catch(err){
    res.status(500).json(err);
  }
};

module.exports = {
  register
}