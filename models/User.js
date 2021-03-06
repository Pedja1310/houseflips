const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const Propert = require('../models/Property');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {  
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property'
    }
  ]
});

UserSchema.methods.generateToken = function() {
  const token = jwt.sign( 
    {_id: this._id},
    config.get('jwtsecret'),
    {expiresIn: '24h'},
  )
  return token;
}

module.exports = User = mongoose.model('User', UserSchema);