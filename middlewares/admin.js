const admin = async (req, res) => {
  if (req.user.role === "admin") {
    return res.status(403).json({
      success: false,
      error: "Access denied. Admin only",
    });
  }
};

module.exports = admin;
