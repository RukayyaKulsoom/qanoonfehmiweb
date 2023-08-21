// isAdmin.js

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      // If the user is an admin, continue to the next middleware/route handler
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Only admins are allowed.' });
    }
  };
  
  module.exports = isAdmin;
  