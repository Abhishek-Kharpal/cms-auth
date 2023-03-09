const loginService = require('../services/login');

const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const token = await loginService.login(email, password);
    res.status(200).json(token);
  }
  catch(err){
    res.status(500).json(err);
  }
};

module.exports = {
  login
};