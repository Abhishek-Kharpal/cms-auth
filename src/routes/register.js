const express = require('express');
const registerController = require('../controllers/register');
const router = express.Router();

router.route('/register')
    .post(registerController.register);

module.exports = router;