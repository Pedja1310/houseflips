const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
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
    res.status(400).json({ msg: errors.array() })
  };

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if(user) {
      res.status(400).json({ msg: "User already exists."});
    }

    user = new User({
      name,
      email,
      password
    })

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();

    // create and return new token for the user
    const payload = {
      id: user.id
    }

    jwt.sign(
      payload,
      config.get('jwtsecret'),
      (error, token) => {
        if(error) console.error(error);
        res.json({token})
      }  
    )
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: 'Server error.'})
  }
})

module.exports = router;