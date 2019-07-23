const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  size: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      // required: true
    }
  ],
  added: {
    type: Date,
    default: Date.now
  }
});

module.exports = Property = mongoose.model('property', PropertySchema);