const express = require('express');
const verifyTokenController = require('../controllers/verifyToken');

const router = express.Router();

router.route('/verify-token')
  .get(verifyTokenController.verifyToken);

module.exports = router;