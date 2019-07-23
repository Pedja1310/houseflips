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
      { $push: {properties: propertyObj} }
    ); 
    await propertyObj.save();
    res.status(200).json(propertyObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: "Server Error"});
  }

});

// @route     PUT api/properties/edit/:propertyId
// @desc      edit existing property
// @access    private
router.put('/edit/:propertyId', auth, async (req, res) => {
  const { size, address, city, country } = req.body;

  const updatedProperty = {};

  if (size) updatedProperty.size = size;
  if (address) updatedProperty.address = address;
  if (city) updatedProperty.city = city;
  if (country) updatedProperty.country = country;

  try {
    let property = await Property.findOne({ _id: req.params.propertyId });

    if (!property) return res.status(400).json({ msg: "Property not found."});

    
    property = await Property.findOneAndUpdate(
      { _id: req.params.propertyId },
      { $set: updatedProperty },
      { new: true }  
    );

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error.')
  }

});


module.exports = router;