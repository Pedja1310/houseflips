const express = require('express');
const router = express.Router();

// User model
const User = require('../models/User');

router.get('/', async (req, res) => {
  res.status(200).send('User route Working');
});

module.exports = router;