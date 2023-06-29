const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const token = bearerHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } 
  catch (err) {
    return res.status(407).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;