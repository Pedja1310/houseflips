const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    console.log('MonogoDB connected...');
  } catch (error) {
    console.error(error.message);

    process.exit(1);
  }
}

module.exports = connectDB;