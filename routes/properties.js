const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// property model
const Property = require('../models/Property');
const User = require('../models/User');

// @route     GET api/auth
// @desc      get all prperties
// @access    Public
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();

    if (properties.length == 0) return res.status(200).json({msg: "Property list is currently empty."});
    
    res.status(200).json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Server Error"})
  }
});

// @route     POST api/properties
// @desc      create new property
// @access    private
router.post('/new', auth, async (req, res) => {

  const { size, address, city, country, images, utilities, numOfRooms, numOfBaths, type, price } = req.body;
  
  // build property object
  const propertyObj = new Property({
    publisher: req.user._id,
    size: size,
    address: address,
    city: city,
    country: country,
    utilities: [...utilities],
    numOfBaths: numOfBaths,
    numOfRooms: numOfRooms,
    type: type,
    price: price,
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
  const { size, address, city, country, numOfBaths, numOfRooms, utilities, type } = req.body;

  const updatedProperty = {};

  if (size) updatedProperty.size = size;
  if (address) updatedProperty.address = address;
  if (city) updatedProperty.city = city;
  if (country) updatedProperty.country = country;
  if (numOfRooms) updatedProperty.numOfRooms = numOfRooms; 
  if (numOfBaths) updatedProperty.numOfBaths = numOfBaths; 
  if (type) updatedProperty.type = type; 
  if (price) updatedProperty.price = price;

  try {
    let property = await Property.findOne({ _id: req.params.propertyId });

    if (!property) return res.status(400).json({ msg: "Property not found."});

    if(property.publisher.toString() !== req.user._id) {
      return res.status(401).json({ msg: "Not Authorized." });
    }
    
    property = await Property.findOneAndUpdate(
      { _id: req.params.propertyId },
      { $set: updatedProperty, utilities},
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