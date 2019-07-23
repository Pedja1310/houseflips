const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// property model
const Property = require('../models/Property');
const User = require('../models/User');

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

  const { size, address, city, country, images } = req.body;
  
  // build property object
  const propertyObj = new Property({
    publisher: req.user._id,
    size: size,
    address: address,
    city: city,
    country: country,
    defaultImage: '../img/mediterranean-default.jpg'
  });

  
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id }, 
      { $push: {properties: propertyObj._id} }
    );
    await propertyObj.save();
    res.status(200).json(propertyObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: "Server Error"});
  }

});

module.exports = router;