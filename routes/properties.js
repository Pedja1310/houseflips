const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// property model
const Property = require('../models/Property');

// @route     GET api/auth
// @desc      test route
// @access    Public
router.get('/', async (req, res) => {
  res.status(200).send('looking good');
});

// @route     POST api/properties
// @desc      create new property
// @access    private
router.post('/new', auth, async (req, res) => {
  res.send('adsfgkjadhfg');
});

module.exports = router;