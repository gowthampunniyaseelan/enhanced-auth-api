const jwt = require('jsonwebtoken');

async function verifyUserOrAdmin(req, res) {
  const token = req.headers.authorization;
  if (!token) {
      return false;
  } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (decoded.isAdmin) {
          return true;
      } else {
          return false;
      }
  }
}

module.exports = verifyUserOrAdmin