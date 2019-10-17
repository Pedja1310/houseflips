const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

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
    res.status(500).json([{ msg: "Server error."}])
  }
});

// @route     GET api/auth
// @desc      Get user from token
// @access    Public
router.get('/', auth, async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).select('-password');
    res.json(user)
  } catch(err) {
    console.log(err.message);
      res.status(500).send([{ msg: 'Server error.' }]);
  }});


module.exports = router;