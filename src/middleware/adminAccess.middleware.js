const jwt = require("jsonwebtoken");

const adminAccess = (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    return res.status(401).redirect("/signin");
  }
  const tokenCookie = access_token.split(" ")[1];
  let token = {};

  try {
    token = jwt.verify(tokenCookie, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).redirect("/signin");
  }

  if (!token.username || token.access !== 1) {
    return res.status(401).redirect("/signin");
  }

  next();
};

module.exports = adminAccess;
