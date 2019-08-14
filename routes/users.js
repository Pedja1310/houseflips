const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { check, validationResult } = require('express-validator');
const router = express.Router();


// User model
const User = require('../models/User');

// @route     POST api/users
// @desc      Register new user
// @access    Public
router.post('/', [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Valid email is required.').isEmail(),
  check('password', 'Password must be at least six characters long.').isLength({min: 6}),
], async (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  };

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if(user) {
      return res.status(400).json([{msg:"User already exists."}]);
    }

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();

    const token = user.generateToken();
    // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    
    res.json({token});
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: 'Server error.'})
  }
})

module.exports = router;