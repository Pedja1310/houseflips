const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if(!token) {
    return res.status(401).json({ msg: 'Authorization denied'});
  }

  // decode and verify user
  try {
    const decodedUser = jwt.verify(token, config.get('jwtsecret'));
    req.user = decodedUser;

    next();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: "Token is not valid."});
  }
} 