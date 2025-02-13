const auth = require("./auth");

exports.admin = async (req, res, next) => {
  auth(req, res, () => {
    // check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Access denied. Admin only",
      });
    }

    // If the user is an admin, proceed to the next middleware/route handler
    next();
  });
};
