const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route     POST api/auth
// @desc      Login and authenticate user
// @access    Public
router.post('/', [
  check('email', 'Valid email is required.').isEmail(),
  check('password', 'Password must be at least six characters long.').isLength({min: 6}),
], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  };

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if(!user) return res.status(400).json([{ msg: "User not found."}]);

    const match = await bcrypt.compare(password, user.password);

    if(!match) return res.status(400).json([{msg: "Invalid credentials."}]);

    const token = user.generateToken();
    res.json({token});
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Server error."})
  }

});

module.exports = router;