// middleware/checkUserExistence.js
const User = require('../Models/User');

module.exports = async (req, res, next) => {
  const { name } = req.body;
  try {
    const user = await User.findOne({ name });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
