const express = require('express');
const loginController = require('../controllers/login');
const router = express.Router();

router.route('/login')
    .post(loginController.login);

module.exports = router;