const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

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
  }
});

UserSchema.methods.generateToken = function() {
  const token = jwt.sign( 
    {_id: this._id},
    config.get('jwtsecret'),
    {expiresIn: 36000},
  )
  return token;
}

module.exports = User = mongoose.model('user', UserSchema);