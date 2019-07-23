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

// @route   GET api/properties/:propertyId
// @desc    get single property
// @access  public
router.get('/:propertyId', async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.propertyId });
    
    if(!property) return res.status(404).json({ msg: "Property not found." });
    
    res.json(property);
  } catch (error) {
    console.error(error);

    if(error.kind ==='ObjectId') { 
      return res.status(400).json({ msg: "Profile not found." });
    }

    res.status(500).json({ msg: "Server error." });
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

    if(property.publisher.toString() !== req.user._id) {
      return res.status(401).json({ msg: "Not Authorized." });
    }
    
    property = await Property.findOneAndUpdate(
      { _id: req.params.propertyId },
      { $set: updatedProperty },
      { new: true }  
    );

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error.' })
  }
});

// @route   Delete apit/properties
// @desc    remove property
// @access  private
router.delete('/:propertyId', auth, async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.propertyId });

    if(property.publisher.toString() !== req.user._id) {
      return res.status(401).json({ msg: "Not Authorized." });
    }

    let user = await User.findOneAndUpdate(
      { _id: req.user._id},
      { $pull: { properties: req.params.propertyId }},
      { new: true }  
    );

    await Property.findOneAndDelete({ _id: req.params.propertyId });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error."});
  }
});


module.exports = router;